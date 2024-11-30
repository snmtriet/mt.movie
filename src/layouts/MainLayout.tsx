import { Footer, Header, ModalMovie } from '@/components/shared'
import Views from '@/views/Views'

const MainLayout = () => {
  return (
    <main className="relative">
      <Header />
      <div className="relative mx-auto -mt-[72px] min-h-screen overflow-hidden pl-2 md:pl-0">
        <Views />
      </div>
      <Footer />
      <ModalMovie />
    </main>
  )
}

export default MainLayout
