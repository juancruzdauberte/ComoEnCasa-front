export const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-svh">
      <div className="bg-black/5 shadow-lg rounded-sm px-10 py-16 w-full max-w-4xl flex items-center justify-between gap-14">
        <div>
          <picture>
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1749124735/LogoComoEnCasaRedondo_gwhyxu.png"
              alt="logo"
              loading="lazy"
              className="h-56"
            />
          </picture>
        </div>

        <div className="pr-40">
          <h1 className="text-4xl text-center font-bold">Not Found</h1>
        </div>
      </div>
    </section>
  );
};
