import bcrypt from 'bcrypt'
export const hashedPassword=async (password)=>{
    return await bcrypt.hash(password,10)
}
export const comparePassword=async(password,newPassword)=>{
    return await bcrypt.compare(password,newPassword)
}