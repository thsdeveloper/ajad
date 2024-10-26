import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

type SlideAction = {
    label: string;
    onClick: () => void;
};

type Slide = {
    title: string;
    subtitle: string;
    image: string;
    action?: SlideAction;
};

type AJADCarouselProps = {
    slides?: Slide[];
    textAlign?: 'left' | 'center' | 'right';
    showBadges?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
};

const defaultSlides: Slide[] = [
    {
        title: "AJAD 2024",
        subtitle: "Acampamento de jovens",
        image: "/api/placeholder/800/400",
        action: {
            label: "Inscreva-se",
            onClick: () => console.log("Ação")
        }
    },
    {
        title: "Atividades",
        subtitle: "Momentos especiais",
        image: "/api/placeholder/800/400"
    }
];

const AJADCarousel = ({
    slides = defaultSlides,
    textAlign = 'center',
    showBadges = false,
    autoPlay = false,
    autoPlayInterval = 5000
}: AJADCarouselProps) => {
    const [api, setApi] = React.useState<any>();
    const [current, setCurrent] = React.useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        if (autoPlay) {
            const interval = setInterval(() => {
                api?.next();
            }, autoPlayInterval);
            return () => clearInterval(interval);
        }
    }, [api, autoPlayInterval, autoPlay]);

    const getTextAlignment = () => {
        switch (textAlign) {
            case 'left':
                return 'items-start text-left pl-12';
            case 'right':
                return 'items-end text-right pr-12';
            default:
                return 'items-center text-center';
        }
    };

    return (
        <section className="w-full relative bg-black">
            <Carousel
                className="w-full"
                setApi={setApi}
                onSelect={(api) => setCurrent(api.selectedScrollSnap())}
            >
                <CarouselContent>
                    {slides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <Card className="border-none rounded-none">
                                <CardContent className="relative p-0 h-[60vh] md:h-[70vh]">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute inset-0 bg-black/40 flex flex-col justify-center ${getTextAlignment()}`}>
                                        <div className="container mx-auto px-4">
                                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{slide.title}</h2>
                                            <p className="text-xl md:text-2xl mb-6 text-white">{slide.subtitle}</p>
                                            {slide.action && (
                                                <Button
                                                    onClick={slide.action.onClick}
                                                    variant="secondary"
                                                    size="lg"
                                                    className="mt-4"
                                                >
                                                    {slide.action.label}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="left-4 h-12 w-12" />
                <CarouselNext className="right-4 h-12 w-12" />
            </Carousel>

            {showBadges && slides.length > 1 && (
                <div className="absolute bottom-8 left-0 right-0">
                    <div className="flex justify-center gap-2">
                        {slides.map((_, index) => (
                            <Badge
                                key={index}
                                variant={current === index ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => api?.scrollTo(index)}
                            >
                                {index + 1}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default AJADCarousel;