import React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

// Replace cn utility with a simple className concatenation function
const classNames = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
};

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-800 to-indigo-600 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Updated container styles */}
                <div className="flex h-16 items-center justify-between"> {/* Added justify-between */}
                    {/* Logo */}
                    <div className="flex-shrink-0 text-white">
                        <div className="font-extrabold text-3xl">AJAD 2025</div>
                        <div className="text-xs">Juventude, Fé e diversão sob o mesmo céu!</div>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 flex items-center justify-center"> {/* Center navigation */}
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Sobre</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-6 w-[400px]">
                                            <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50 to-blue-100 p-6 no-underline outline-none focus:shadow-md"
                                                        href="#"
                                                    >
                                                        <div className="mb-2 text-lg font-medium">
                                                            AJAD 2024
                                                        </div>
                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                            Uma experiência que vai transformar sua vida - 4 dias de louvor, palavra e comunhão.
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <ListItem href="#" title="Local">
                                                Chácara Recanto Feliz - São Paulo, SP
                                            </ListItem>
                                            <ListItem href="#" title="Data">
                                                15 a 18 de Fevereiro de 2024
                                            </ListItem>
                                            <ListItem href="#" title="Público">
                                                Jovens e Adolescentes de 14 a 25 anos
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Programação</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4">
                                            <ListItem title="Louvor" href="#">
                                                Momentos especiais de adoração
                                            </ListItem>
                                            <ListItem title="Palavra" href="#">
                                                Mensagens impactantes
                                            </ListItem>
                                            <ListItem title="Comunhão" href="#">
                                                Novas amizades
                                            </ListItem>
                                            <ListItem title="Atividades" href="#">
                                                Diversão e aprendizado
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#depoimentos">
                                        Depoimentos
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* CTA Button */}
                    <div className="flex-shrink-0">
                        <Button
                            className="bg-blue-900 text-white hover:bg-blue-800"
                            onClick={() => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Inscreva-se Agora
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={classNames(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

export default Header;