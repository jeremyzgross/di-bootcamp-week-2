interface UserProp {
  name: string
  age: number
}

const UserProfile: React.FC<UserProp> = ({
  name, age
}) => {
  return <h2>  {name} is {age} years old </h2> } 

  export default UserProfile