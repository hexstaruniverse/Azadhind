import Rocket from '../assets/Rocket.png'
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className='w-full h-full bg-black flex flex-col gap-5'>
      <Navbar />
      <div className='sm:pl-25 sm:py-28 p-8 flex flex-col sm:gap-10 gap-5 relative container'>
        <div className="justify-start sm:w-[883px] z-10"><span className="text-red-600 sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">A</span><span className="text-white sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">ZAD Sounding Rocket – Redefining Hybrid Propulsion</span></div>
        <a href='/book-launch' className='flex justify-center items-center w-36 h-10 text-white border border-[#F00000] font-sans'>Book Launch</a>
        <img src={Rocket} alt="Rocket" className='sm:absolute sm:right-5 sm:mt-4' />
      </div>
    </div>
  );
}

export default Home;
