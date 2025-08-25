import React, { useState, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { IoSend } from 'react-icons/io5';
import { BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  Comment,
} from '../features/comments/commentsApi';

interface CommentSectionProps {
  postId: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [commentBody, setCommentBody] = useState('');
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [userName, setUserName] = useState('');
  const commentTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [updateComment] = useUpdateCommentMutation();
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const { data: comments, isLoading, error } = useGetCommentsByPostIdQuery(postId);

  const handleEditClick = (comment: Comment) => {
    setEditingComment(comment);
    setCommentBody(comment.body);
    setUserName(comment.name);
    commentTextAreaRef.current?.focus();
  };

  const handleDeleteClick = (commentId: number) => {
    deleteComment(commentId);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const textarea = commentTextAreaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = commentBody.substring(0, start) + emojiData.emoji + commentBody.substring(end);
      setCommentBody(newText);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emojiData.emoji.length;
      }, 0);
    }
    setShowEmojiPicker(false);
  };

  const isFormValid = () => {
    return userName.trim() !== '' && commentBody.trim() !== '';
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (editingComment) {
      const updatedCommentData = {
        ...editingComment,
        body: commentBody,
        name: userName,
        date: new Date().toISOString(),
      };
      updateComment(updatedCommentData as any);
      setEditingComment(null);
    } else {
      const newComment = {
        postId,
        name: userName,
        body: commentBody,
        date: new Date().toISOString(),
      };
      createComment(newComment as any);
    }

    setCommentBody('');
    setUserName('');
  };

  if (isLoading) return <div className="text-white">Cargando comentarios...</div>;
  if (error) return <div className="text-red-500">Ocurrió un error al cargar los comentarios.</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 max-h-72 overflow-y-auto pr-2">
        {comments?.map((comment) => (
          <div key={comment.id} className="bg-gray-700 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-white">@{comment.name}</span>
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(comment.date || new Date()), { addSuffix: true, locale: es })}
              </span>
            </div>
            <p className="text-gray-300 break-words">{comment.body}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEditClick(comment)} className="text-yellow-500 text-sm hover:underline">
                Editar
              </button>
              <button onClick={() => handleDeleteClick(comment.id)} className="text-yellow-500 text-sm hover:underline">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-5 bg-gray-800 rounded-lg shadow-sm mt-5 relative">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="user-name" className="text-white mb-1 block font-bold">
              Tu nombre
            </label>
            <input
              id="user-name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Escribe tu nombre aquí"
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="relative">
            <label htmlFor="comment-textarea" className="text-white mb-1 block font-bold">
              Escribe un comentario
            </label>
            <textarea
              id="comment-textarea"
              ref={commentTextAreaRef}
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Escribe tu comentario aquí..."
              rows={4}
              className="w-full p-2 pr-16 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            ></textarea>
            <div className="absolute right-2 top-10 flex gap-2">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-400 hover:text-white"
              >
                <BsEmojiSmile size={24} />
              </button>
              <button type="submit" className="text-yellow-500 hover:text-orange-600">
                <IoSend size={24} />
              </button>
            </div>
          </div>
        </form>
        {showEmojiPicker && (
          <div className="absolute top-full left-0 mt-2 z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.DARK} />
          </div>
        )}
      </div>
    </div>
  );
};