import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ]

  return (
    <footer className="bg-gradient-to-br from-primary-700 to-primary-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold text-xl">
                RS
              </div>
              <div>
                <div className="font-bold text-lg">
                  Colégio Roberto Simonsen
                </div>
              </div>
            </div>
            <p className="text-primary-100 text-sm">
              Educação de qualidade para formar cidadãos conscientes e preparados para o futuro.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="space-y-3 text-primary-100 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Endereço do colégio<br />Cidade - Estado</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(00) 0000-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>contato@simonsen.edu.br</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <div className="space-y-2">
              <Link
                href="/noticias"
                className="block text-primary-100 hover:text-white transition-colors text-sm"
              >
                Notícias
              </Link>
              <Link
                href="/galeria"
                className="block text-primary-100 hover:text-white transition-colors text-sm"
              >
                Galeria de Fotos
              </Link>
              <Link
                href="/eventos"
                className="block text-primary-100 hover:text-white transition-colors text-sm"
              >
                Calendário de Eventos
              </Link>
              <Link
                href="/buscar"
                className="block text-primary-100 hover:text-white transition-colors text-sm"
              >
                Buscar
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-600 mt-8 pt-8 text-center text-primary-200 text-sm">
          <p>
            © {currentYear} Colégio Roberto Simonsen. Todos os direitos reservados.
          </p>
          <p className="mt-2">
            Desenvolvido com 💚 para a educação pública
          </p>
        </div>
      </div>
    </footer>
  )
}
