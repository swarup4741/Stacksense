import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center px-9 max-w-2xl lg:max-w-7xl lg:justify-between mx-auto mt-10 lg:px-20">
      <section className="text-center lg:text-left my-12 space-y-9">
        <h1 className=" text-mobile md:text-5xl md:leading-none leading-10 line font-bold text-indigo-light">
          Stacksense
          <br />
          Cloud Storage
        </h1>
        <p className="text-lg max-w-md text-indigo">
          Forgot your file? Don't worry we got you. Stacksense lets you go
          anywhere with ease without having to think about your files.
        </p>

        <Link href="/signup">
          <a className="block lg:inline-block lg:px-8 py-3 bg-indigo text-white rounded-lg text-md shadow-lg">
            Get Started for Free
          </a>
        </Link>
      </section>

      <Image src="/assets/hero.svg" height={437} width={476} />
    </div>
  );
};
