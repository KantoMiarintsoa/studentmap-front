export default function Chat() {
  return (
    <div className="flex h-screen w-full text-sm font-sans bg-gray-50 text-gray-800">
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b">
          <img
            src="https://i.pravatar.cc/40?img=3"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Jontray Arnold</p>
            <span className="text-green-500 text-xs">● available</span>
          </div>
        </div>

        <div className="flex justify-around py-4 border-b text-gray-400">
          <button className="hover:text-blue-500">💬</button>
          <button className="hover:text-blue-500">📁</button>
          <button className="hover:text-blue-500">📞</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[
            'Real estate deals',
            'Kate Johnson',
            'Tamara Shevchenko',
            'Joshua Clarkson',
            'Jeroen Zoet',
          ].map((name, i) => (
            <div key={i} className="flex gap-3 items-start hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                {name[0]}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{name}</p>
                <p className="text-xs text-gray-500 truncate">Message preview here...</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-white border-b flex justify-between items-center">
          <div>
            <h2 className="font-semibold">Group Chat</h2>
            <div className="text-sm text-gray-500">Messages • Participants</div>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50">
          {/* Message d'autres */}
          <div className="flex items-start gap-3">
            <img src="https://i.pravatar.cc/32?img=4" className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-xs text-gray-500 mb-1">Evan Scott, 11:25 AM</p>
              <div className="bg-white p-3 rounded-xl shadow-sm max-w-md">
                Ooo, why don’t you say something more 😊
              </div>
            </div>
          </div>

          {/* Votre message */}
          <div className="flex justify-end">
            <div>
              <p className="text-xs text-right text-gray-500 mb-1">You, 11:30 AM</p>
              <div className="bg-blue-100 text-blue-900 p-3 rounded-xl shadow-sm max-w-md">
                She creates an atmosphere of mystery 😎😎
              </div>
            </div>
          </div>

          {/* Autres messages */}
          <div className="flex items-start gap-3">
            <img src="https://i.pravatar.cc/32?img=4" className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-xs text-gray-500 mb-1">Evan Scott, 11:34 AM</p>
              <div className="bg-white p-3 rounded-xl shadow-sm max-w-md">
                Kate, don’t be like that and say something more 😉
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <img src="https://i.pravatar.cc/32?img=5" className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-xs text-gray-500 mb-1">Kate Johnson, 11:35 AM</p>
              <div className="bg-white p-3 rounded-xl shadow-sm max-w-md">
                What’s in it for me? 😏
              </div>
            </div>
          </div>
        </main>

        {/* Footer input */}
        <footer className="p-4 bg-white border-t flex items-center gap-3">
          <input
            type="text"
            className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Write your message..."
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
            ➤
          </button>
        </footer>
      </div>

      {/* Fichiers partagés */}
      <aside className="w-72 bg-white border-l hidden lg:block p-4">
        <h3 className="text-lg font-semibold mb-2">Shared files</h3>
        <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-3 mb-4">
          <img src="https://placehold.co/50x50" className="rounded" />
          <div>
            <p className="font-semibold">Real estate deals</p>
            <p className="text-xs text-gray-500">10 members</p>
          </div>
        </div>
        <div className="flex gap-4 text-center text-sm mb-4">
          <div className="flex-1 bg-blue-100 p-2 rounded">
            <p className="font-bold text-blue-600">231</p>
            <p className="text-gray-500">All files</p>
          </div>
          <div className="flex-1 bg-purple-100 p-2 rounded">
            <p className="font-bold text-purple-600">45</p>
            <p className="text-gray-500">Docs</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { type: 'Documents', color: 'purple', count: 196, size: '12MB' },
            { type: 'Photos', color: 'yellow', count: 15, size: '32MB' },
            { type: 'Movies', color: 'green', count: 3, size: '700MB' },
            { type: 'Other', color: 'gray', count: 45, size: '19MB' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-8 h-8 bg-${item.color}-200 text-${item.color}-700 flex items-center justify-center rounded-lg`}>
                📁
              </div>
              <div>
                <p className="font-semibold">{item.type}</p>
                <p className="text-xs text-gray-500">{item.count} files, {item.size}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
