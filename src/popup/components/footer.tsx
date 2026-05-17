import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 z-10 right-0 w-full py-3 flex items-center justify-center gap-1 text-sm">
        <p className="text-neutral-500">Having Issues? <Link className="text-blue-600" to="https://github.com/Priyanshudotdev/nextleet.priyanshuu.tech/" target="_blank">Repo bug</Link></p>
        <p>|</p>
        <p className="text-neutral-500">Made with 💗 by <Link className="text-blue-600" to="https://priyanshuu.tech" target="_blank">Priyanshu</Link></p>
    </div>
    )
}

export default Footer