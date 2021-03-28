export interface User {
	username: string
	uid: string
	email: string
	photo?: string
}

export interface UserUpdate {
	username?: string
	photo?: string
	
}

export interface UserState {
	username?: string | null
	uid?: string | null
	email?: string | null
	photo?: string | null
}

export interface UserWithoutId {
	username: string
	email: string
}
