
import GetLinkButton from "@/components/GetLinkButton"

export default function Main() {
    return (
        <div className="flex flex-col basis-full justify-center items-center min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 to-teal-100">
          <p className="font-medium text-9xl mx-1 my-1 py-1">SHORTY</p>
          <p className="text-3xl mx-1 my-1 py-1">A simple URL shortner</p>
          <GetLinkButton/>
          <div className="absolute font-medium bottom-0 right-0 my-1 mx-2 p-1 text-l italic"> Developed by Prabhav Singh Negi | <a  className="pb-2 p-1 float-right" href="https://github.com/prabhavnegi"><img width={20} src="/github-mark.svg" alt="" /></a></div>
      </div>
    )
  }
  
  