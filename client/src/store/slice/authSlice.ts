import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import supabase from '../../config/config';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';

//interface here

interface authState {
    mode: string;
    name: string;
    email: string;
    email2: string;
    pass: string;
    pass2 : string;
    conPass: string;
}

const initialState: authState = {
    mode: "login",
    name: "",
    email: "",
    email2: "",
    pass: "",
    pass2: "",
    conPass: ""
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<string>) => {
            state.mode = action.payload;
        },

        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },

        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },

        setEmail2: (state, action: PayloadAction<string>) => {
            state.email2 = action.payload;
        },

        setPass: (state, action: PayloadAction<string>) => {
            state.pass = action.payload;
        },
        
        setPass2: (state, action: PayloadAction<string>) => {
            state.pass2 = action.payload;
        },

        setConPass: (state, action: PayloadAction<string>) => {
            state.conPass = action.payload;
        }
    }
});

export const loginSlice = async (email: string, pass: string, dispatch: any) => {
    const {data, error} = await supabase.from('blog_users').select('*').eq('userEmail',email);

    if (error || data.length == 0) {
        Swal.fire({
            title:'Email Not Registered',
            text:'Your email is note registered please try again',
            icon:'error'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setEmail(""));
                dispatch(setPass(""));
            }
        })
    }

    else {
        const isMatch = await bcrypt.compare(pass, data[0].userPass);

        if (isMatch) {
            localStorage.setItem('userName',data[0].userName);
            localStorage.setItem('userEmail',data[0].userEmail);

            window.location.href='/Blog';
        }

        else {
            Swal.fire({
                title:'Invalid Password',
                text:'Your password is invalid please try again',
                icon:'error'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(setEmail(""));
                    dispatch(setPass(""));
                    window.location.reload();
                }
            })
        }
    }
}

export const signupSlice = async (name: string, email2: string, pass2: string, conPass: string, dispatch: any) => {
    if (pass2 === conPass) {
        const hashPass = await bcrypt.hash(pass2, 10);

        const {data, error} = await supabase.from('blog_users').insert({userName: name, userEmail: email2, userPass: hashPass});

        if (error) {
            Swal.fire({
                title:'Error Signing Up',
                text:'There has been an error in signing up',
                icon:'error'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(setName(""));
                    dispatch(setEmail2(""));
                    dispatch(setPass2(""));
                    dispatch(setConPass(""));
                    window.location.reload();
                }
            })
        }

        else {
            Swal.fire({
                title:'Account Registered',
                text:'Your account has been registered please login',
                icon:'success'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(setName(""));
                    dispatch(setEmail2(""));
                    dispatch(setPass2(""));
                    dispatch(setConPass(""));
                    window.location.reload();
                }
            })
        }
    }

    else {
        Swal.fire({
            title:'Password Not Match',
            text:'Your password is not match with confirm password please try again',
            icon:'error'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setName(""));
                dispatch(setEmail2(""));
                dispatch(setPass2(""));
                dispatch(setConPass(""));
                window.location.reload();
            }
        })
    }
}

export const {setMode, setName, setEmail, setEmail2, setPass, setPass2, setConPass} = authSlice.actions;

export default authSlice.reducer;