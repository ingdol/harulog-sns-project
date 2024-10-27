export default function ProfilePage({
  params,
}: {
  params: { id: string | string[] };
}) {
  const isOwner = params.id === "user";
  return (
    <div className="flex-grow p-10 max-w-screen-lg">
      {isOwner ? (
        <div>
          <h1 className="text-2xl font-semibold">Shirley Romero</h1>
          <button className="text-gray-500 mt-2">Edit Profile</button>
          <div className="grid grid-cols-3 gap-1 md:gap-4 mt-6">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="w-full bg-gray-200 aspect-square" />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">mkbhd</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Following
            </button>
          </div>
          <p className="text-gray-500">1,428 posts • 654 following</p>
          <div className="grid grid-cols-3 gap-1 md:gap-4 mt-6">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="w-full bg-gray-200 aspect-square" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
