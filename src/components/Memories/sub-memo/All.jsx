import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BlurFade = ({ children, className, delay = 0, duration = 1.4 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
        transition={{ delay, duration, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };


export default function All() {


    const imageCount = 19;
    const images = Array.from({ length: imageCount }, (_, i) => `/src/assets/memo/all${i + 1}.jpg`);

  return (
    <>
      <div className=" bg-gray-900 flex justify-center items-center">
        <div className="flex flex-col justify-center mt-10 items-center gap-5">
          <h1 className="text-4xl font-extrabold text-white ">
            CRICKET
          </h1>
          <section id="photos" className="p-6 w-[80%]">
      <div className="columns-2 sm:columns-3 gap-5">
        {images.map((imageUrl, idx) => (
          <BlurFade key={idx} delay={0.1 * idx}>
            <img
              className="mb-4 w-full h-auto rounded-lg object-cover"
              src={imageUrl}
              alt={`Image ${idx + 1}`}
            />
          </BlurFade>
        ))}
      </div>
    </section>
        </div>
      </div>
    </>
  );
}
