import { createContext, useContext, useState } from "react"

const AuthContext = createContext(undefined)

export function AuthProvider({children}){
 let[user,setUser] = useState(null);
 const[isAuth,setIsAuth] = useState(false)

 return(
    <div>
        <AuthContext.Provider value={{user,setUser,isAuth,setIsAuth}}>
            {children}
        </AuthContext.Provider>
    </div>
 )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth must be used within ans authProvider')
    }
    return context
}