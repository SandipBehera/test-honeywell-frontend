import React from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const onSubmit = async(data) => {
        const postData = {
            user_id: data.userId
        }
        const response = await fetch('http://localhost:3000/api/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });
        const resData = await response.json();
        if(resData.message==='User found'){
            localStorage.setItem('user_id',data.userId);
            window.location.href = `/movies`;
        }
        else{
          alert('Something went wrong');
        }
      };

    return (
        <div style={{textAlign:'center',marginTop:"15%"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Enter User ID</label><br/>
                <input type="text"  name='userId' placeholder='Enter UserId' {...register('userId', { required: true })}/>
                <button type='submit'>Login</button>
                </form>
        </div>
    )
}

export default LoginPage;