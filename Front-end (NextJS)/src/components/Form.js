import Input from '@/components/Input'
import IAOutput from '@/components/AIOutput'
import UserInput from '@/components/UserInput'

const Form = (props) => {
    return(
        <div className={"flex flex-col border border-gray-400 p-4 rounded-2xl h-screen overflow-x-auto"}>
            <div className={"p-4"}>
                <IAOutput>AI OUTPUT</IAOutput>
                <UserInput>USERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINP
                    UTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUT
                    USERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUT
                </UserInput>
            </div>
            <div className={"p-4 mt-auto"}>
                <Input></Input>
            </div>
        </div>
    )
}

export default Form
