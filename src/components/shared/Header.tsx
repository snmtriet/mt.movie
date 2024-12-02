import { cn } from '@/utils'
import { useEffect, useState } from 'react'
import { GoSearch } from 'react-icons/go'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { RiArrowDownSFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Heading, Input, Tag, Text } from '../ui'

const Header = () => {
  const [scrollOffset, setScrollOffset] = useState(0)
  const [openSearch, setOpenSearch] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleOpenSearch() {
    setOpenSearch(true)
  }

  return (
    <>
      <div
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300 ease-in-out',
        )}
        style={{
          backgroundImage:
            'linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent)',
          backgroundColor: scrollOffset > 0 ? 'rgb(20, 20, 20)' : 'transparent',
        }}
      >
        <div
          className={cn(
            'mx-auto flex w-full items-center justify-between px-2 py-4 md:px-8',
          )}
        >
          <div className="flex items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Tag className="border-none bg-red-700 px-2 py-1">
                  <Heading as="h2" bold className="text-dark">
                    MT
                  </Heading>
                </Tag>
                <Heading as="h2" bold className="ml-1 text-red-700">
                  Movie
                </Heading>
              </Link>
            </div>
            <nav className="ml-10 hidden md:block">
              <ul className="flex items-center gap-lg">
                <Link to="/">
                  <Text className="cursor-pointer text-light-1 hover:text-light">
                    Trang chủ
                  </Text>
                </Link>
                <Text className="cursor-pointer text-light-1 hover:text-light">
                  Phim
                </Text>
                <Text className="cursor-pointer text-light-1 hover:text-light">
                  Mới & Phổ biến
                </Text>
                <Text className="cursor-pointer text-light-1 hover:text-light">
                  Danh sách của tôi
                </Text>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-lg">
            <div>
              <div
                className={cn({ 'rounded border border-white/60': openSearch })}
              >
                <div className="flex items-center justify-between pl-1">
                  <GoSearch
                    size={24}
                    className="cursor-pointer"
                    onClick={handleOpenSearch}
                  />
                  {openSearch && (
                    <Input placeholder="Tìm kiếm..." className="border-none" />
                  )}
                </div>
              </div>
            </div>
            <div className="relative">
              <IoMdNotificationsOutline size={24} />
              <div className="absolute -right-1.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-700 text-sm">
                1
              </div>
            </div>
            <div className="flex items-center">
              <img src="/images/avatar-red.png" className="h-xl rounded" />
              <RiArrowDownSFill className="ml-1" size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
