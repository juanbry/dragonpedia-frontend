import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, PostFormData } from '../schemas/postSchema'; 

const PostForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => {
    console.log(data);
    alert('Formulario validado y listo para enviar. Revisa la consola para ver los datos.');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-yellow-500 mb-4 text-center">CREAR GUERRERO INTERGALÁCTICO</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-white mb-1">NOMBRE</label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="body" className="block text-white mb-1">DESCRIPCIÓN</label>
          <textarea
            id="body"
            {...register('body')}
            className="w-full p-2 rounded-md bg-gray-700 text-white h-24 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          ></textarea>
          {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors duration-300 hover:bg-orange-600"
        >
          ¡COMENZAR AVENTURA! 
        </button>
      </form>
    </div>
  );
};

export default PostForm;