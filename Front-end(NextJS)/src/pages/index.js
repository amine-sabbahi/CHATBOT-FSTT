import Image from "next/image";
import { Inter } from "next/font/google";
import Button from "../components/Button";
import Input from "../components/Input";
import InputValid from '@/components/InputValid'
import InputError from '@/components/InputError'
import AppLayout from '@/components/Layout/AppLayout'
import SideBar from '@/components/SideBar'
import AIOutput from '@/components/AIOutput'
import UserInput from '@/components/UserInput'
import Form from '@/components/Form'
import IAOutput from '@/components/AIOutput'
import axios from '@/lib/axios'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <AppLayout>
          <SideBar></SideBar>
          <Form>
              <IAOutput>AI OUTPUT</IAOutput>
              <UserInput>USERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINP
                  UTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUT
                  USERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUTUSERINPUT
              </UserInput>
          </Form>
      </AppLayout>
  )
}
