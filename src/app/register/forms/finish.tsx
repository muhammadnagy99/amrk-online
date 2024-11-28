export default function Finish() {
  const navigate = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
          fill="#21C179"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M41.0945 18.4332C41.6366 18.9847 41.6287 19.8711 41.0771 20.413L25.102 36.1082C24.5661 36.6349 23.7098 36.6444 23.1624 36.1301L15.6757 29.0979C15.1122 28.5687 15.0844 27.6825 15.6138 27.1191C16.1432 26.5555 17.0292 26.5278 17.5927 27.057L24.099 33.1685L39.1149 18.4157C39.6662 17.8738 40.5527 17.8816 41.0945 18.4332Z"
          fill="white"
        />
      </svg>

      <p className="text-base lg:text-2xl font-semibold text-primText">Setup Complete!</p>

      <p className="text-sm lg:text-base font-medium text-primText text-center">
        Congratulations! Your online services are ready to go. Start taking
        orders and reservations today!
      </p>
      <button
        type="button"
        className="w-full bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg"
        onClick={() => navigate('https://www.example.com')}
      >
        Go to Portal
      </button>
    </div>
  );
}
