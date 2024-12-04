
import { useState, useCallback, useEffect} from 'react'
import Image from "next/image";
import { motion } from 'framer-motion';

const ImageRegalo = ({ dropZoneRef, regalo, addRegalosHandle }: any) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isSelected, setIsSelected] = useState(false)
    const handleDragEnd = (event: any, info: any) => {
        const newPosition = {
            x: position.x + info.offset.x,
            y: position.y + info.offset.y
        };

        setPosition(newPosition);

        // Verificar si el div de drop zone existe
        if (dropZoneRef.current) {
            const dropZone = dropZoneRef.current.getBoundingClientRect();
            const imageRect = event.target.getBoundingClientRect();

            // Verificar si la imagen está dentro del drop zone
            const isInDropZone =
                imageRect.left >= dropZone.left &&
                imageRect.right <= dropZone.right &&
                imageRect.top >= dropZone.top &&
                imageRect.bottom <= dropZone.bottom;
            setIsSelected(isInDropZone)
            // if (isInDropZone) {
            //     console.log('Imagen está en el drop zone');
            //     setIsSelected(true)
            //     // Aquí puedes agregar la lógica que quieras cuando la imagen está en el drop zone
            // }
        }
    };

    useEffect(() => {
      if(isSelected)  addRegalosHandle(regalo)
    }, [isSelected])
    

    return (
        <div className={isSelected ? 'hidden': 'flex' + ' justify-center items-center border border-sky-100'} key={regalo.id}>
            <motion.div
                style={{
                    width: 317,
                    height: 308,
                    cursor: 'grab',
                    display: 'inline-block'
                }}
                drag
                dragConstraints={{
                    top: -90,
                    left: -90,
                    bottom: window.innerHeight * 0.5,
                    right: window.innerWidth * 0.7
                }}
                dragElastic={0.7}
                whileDrag={{ cursor: 'grabbing' }}
                onDragEnd={handleDragEnd}
            >
                <Image
                    alt="Image"
                    src={regalo.url}
                    width={180}
                    height={180}
                    draggable={false}
                    style={{
                        pointerEvents: 'none',
                        userSelect: 'none',
                        WebkitUserSelect: 'none'
                    }}
                />

            </motion.div>

        </div>

    )
}

export default ImageRegalo