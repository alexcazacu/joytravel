import { Icon } from '@iconify/react';

export function Footer() {
  return (
    <footer className="text-white">
      <div className="bg-[#037280] w-full py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Momadica Travel</h3>
              <p className="text-sm mb-2">Joyscape SRL</p>
              <p className="text-sm mb-2">CUI: 42802735</p>
              <p className="text-sm">Nr. Înmatriculare: J40/8364/2020</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Informații Utile</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://anpc.ro/ce-este-sal/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm hover:underline"
                  >
                    ANPC
                  </a>
                </li>
                <li>
                  <a
                    href="/legal/licenta.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm hover:underline"
                  >
                    Licența de turism
                  </a>
                </li>
                <li>
                  <a
                    href="/legal/asigurare.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm hover:underline"
                  >
                    Polița de asigurare
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm mb-2">Email: contact@momadica.ro</p>
              <p className="text-sm mb-2">Telefon: +40 747 096 542</p>
              <div className="flex space-x-4 mt-2">
                <a
                  href="https://www.facebook.com/momadica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300"
                >
                  <Icon icon="mdi:facebook" className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/momadica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300"
                >
                  <Icon icon="mdi:instagram" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#025b66] border-t border-white/20 py-4 text-center">
        <p className="text-sm">&copy; Momadica Travel 2025. Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
}
