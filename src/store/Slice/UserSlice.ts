import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from "@/axios";

interface IPost {
	id: number,
	title: string,
	text: string,
	imgURL: string,
	viewsCount: number,
	authorId: number,
	tags: string[],
}

interface IFollowers {
	id: number,
	userId: number,
	firstName: string,
	lastName: string,
	avatarURL: string,
	authorId: number
}

interface IFollowing {
	id: number,
	userId: number,
	firstName: string,
	lastName: string,
	avatarURL: string,
	authorId: number
}

interface IUser {
	id: number,
	firstName: string,
	lastName: string,
	email: string,
	avatarURL: string,
	posts: IPost[],
	followers: IFollowers[],
	following: IFollowing[],
}

const initialState = {} as IUser

const UserSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser>) {
			state = action.payload;
		}
	}
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;