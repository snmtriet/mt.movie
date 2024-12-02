const Spinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="min-h-[650px] w-full">
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-xl">
          <div
            className="mx-auto flex h-[320px] w-[320px] items-center justify-center bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://opcases.com/_next/static/media/case-info-bg.9052603d.png')",
            }}
          >
            <img
              src="https://i.imgur.com/MGPO5SI.png"
              alt=""
              className="h-[280px]"
            />
          </div>
          <div className="flex items-center gap-md">
            <button className="h-10 w-10 rounded-full border bg-green-500 p-1 transition-all hover:bg-green-700">
              1
            </button>
            <button className="h-10 w-10 rounded-full border bg-green-500 p-1 transition-all hover:bg-green-700">
              2
            </button>
            <button className="h-10 w-10 rounded-full border bg-green-500 p-1 transition-all hover:bg-green-700">
              3
            </button>
            <button className="h-10 w-10 rounded-full border bg-green-500 p-1 transition-all hover:bg-green-700">
              4
            </button>
          </div>
          <div className="flex items-center">
            <button className="rounded bg-red-500 px-4 py-2">Spin</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Spinner
