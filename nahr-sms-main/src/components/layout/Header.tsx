import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Droplets } from 'lucide-react';
import NavLinks from './NavLinks';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/map" className="mr-8 flex items-center space-x-2">
            <Droplets className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Nahr Grid
            </span>
          </Link>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            <NavLinks />
          </nav>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <Droplets className="h-6 w-6 text-primary" />
              <span className="font-bold">Nahr Grid</span>
            </Link>
            <nav className="flex flex-col gap-4">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
