import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle,
  CheckCircle,
  Handshake,
  UserCheck,
  Loader2,
  Send,
  Star,
  Award,
  Heart
} from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Données de l'entreprise
  const companyInfo = {
    name: 'Christ-Roi Agence',
    description: 'Votre partenaire de confiance pour trouver un emploi ou un candidat à Abidjan. On travaille avec honnêteté et simplicité.',
    email: 'christroiagence@gmail.com',
    phone: '+225 05 03 97 47 75',
    location: 'Abidjan, Côte d\'Ivoire',
    hours: 'Lun - Ven: 8h00 - 18h00',
    values: ['Honnêteté', 'Accompagnement', 'Simplicité', 'Confiance'],
    stats: {
      clients: '500+',
      projects: '1000+',
      experience: '5+ ans',
      support: '24/7'
    }
  };

  // Section About - engagements
  const aboutCommitments = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'On vous écoute vraiment',
      description: 'On prend le temps de comprendre vos besoins réels, sans vous presser. Votre situation nous intéresse.'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'On est honnête',
      description: 'Pas de fausses promesses. On vous dit clairement ce qu\'on peut faire pour vous, sans exagérer.'
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: 'On vous accompagne',
      description: 'De la première rencontre jusqu\'à la signature, on est là pour vous guider à chaque étape.'
    }
  ];

  // Informations de contact
  const contactItems = [
    { icon: <Phone className="w-6 h-6" />, title: 'Téléphone', value: '+225 05 03 97 47 75' },
    { icon: <Mail className="w-6 h-6" />, title: 'Email', value: 'christroiagence@gmail.com' },
    { icon: <MapPin className="w-6 h-6" />, title: 'Agence', value: 'Abidjan, Côte d\'Ivoire' },
    { icon: <Clock className="w-6 h-6" />, title: 'Horaires', value: 'Lun - Ven: 8h00 - 18h00' }
  ];

  // Navigation vers les services
  const navigateToCandidats = () => {
    // Navigue vers personnel avec l'onglet "offres" actif (candidats cherchent des offres)
    navigate('/personnel?view=offres');
  };

  const navigateToRecruteurs = () => {
    // Navigue vers personnel avec l'onglet "candidats" actif (recruteurs cherchent des candidats)
    navigate('/personnel?view=candidats');
  };

  // Scroll vers section suivante
  const scrollToNext = () => {
    const nextSection = document.getElementById('services');
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Scroll vers contact
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Gestion du formulaire
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!contactForm.firstName || !contactForm.lastName || !contactForm.email || !contactForm.phone || !contactForm.service || !contactForm.message) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setIsSubmitting(true);
    setShowSuccessMessage(false);

    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      handleSuccess();
    } catch (error) {
      console.error('Erreur envoi message:', error);
      handleError();
    }
  };

  const handleSuccess = () => {
    setIsSubmitting(false);
    setShowSuccessMessage(true);
    setContactForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  const handleError = () => {
    setIsSubmitting(false);
    // Ouvrir l'email client par défaut
    const sujet = contactForm.service === 'candidat' ? 'Je cherche un emploi' : 'Je cherche un candidat';
    const subject = `Contact Christroi: ${sujet}`;
    const body = `
Prénom: ${contactForm.firstName || ''}
Nom: ${contactForm.lastName || ''}
Email: ${contactForm.email || ''}
Téléphone: ${contactForm.phone || ''}
Statut: ${contactForm.service === 'candidat' ? 'Je cherche un emploi' : 'Je cherche un candidat'}

Message:
${contactForm.message || ''}
    `.trim();

    const mailtoLink = `mailto:christroiagence@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="home-page min-h-screen textured-bg">
      {/* SECTION HERO LUXURY */}
      <section className="hero relative h-screen flex items-center justify-center overflow-hidden">
        {/* Image de fond décorative */}
        <img
          src="/images/premium_photo-1661611453390-0e5a2e299fac.avif"
          alt="Professionnels au travail"
          className="hero-image"
        />
        
        {/* Overlay gradient royal */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        <div className="hero-content">
          <div className="animate-fade-in-up">
            <h1 className="hero-title">
              Trouvez le bon job ou le bon employé
            </h1>
          </div>

          <div className="animate-fade-in-up animate-delay-200">
            <p className="hero-subtitle">
              Chez Christ-Roi Agence, nous vous aidons à trouver votre place dans le monde du travail à Abidjan. 
              Des opportunités réelles, un accompagnement personnalisé.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center animate-fade-in-up animate-delay-300">
            <button
              onClick={navigateToCandidats}
              className="btn-primary flex items-center justify-center gap-3 text-lg"
            >
              <UserCheck className="w-5 h-5" />
              <span>Je cherche un emploi</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={navigateToRecruteurs}
              className="btn-secondary flex items-center justify-center gap-3 text-lg"
            >
              <Handshake className="w-5 h-5" />
              <span>Je cherche un employé</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button 
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-secondary transition-colors cursor-pointer animate-bounce-slow"
        >
          <div className="text-center">
            <div className="text-sm mb-2">Comment ça marche ?</div>
            <ChevronDown className="w-6 h-6 mx-auto" />
          </div>
        </button>
      </section>

      {/* SECTION SERVICES LUXURY */}
      <section id="services" className="section bg-gradient-base">
        <div className="luxury-container">
          <div className="section-header animate-fade-in-up">
            <h2 className="section-title">
              On vous aide concrètement
            </h2>
            <p className="section-subtitle">
              Que vous soyez à la recherche d'un travail ou d'un employé, nous trouvons la solution qui vous convient
            </p>
            <div className="section-divider"></div>
          </div>

          <div className="grid-2 max-w-4xl mx-auto">
            {/* Carte pour les candidats */}
            <div 
              onClick={navigateToCandidats}
              className="card-premium hover-lift cursor-pointer group animate-fade-in-left"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <UserCheck className="w-8 h-8 text-primary" />
                  </div>
                  <div className="w-8 h-1 bg-gradient-royal"></div>
                </div>
                
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  Je cherche un emploi
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Chauffeur, vigile, nounou, femme de ménage, etc... On vous aide à trouver le job qui correspond à vos besoins.
                </p>
                
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:text-primary-600 transition-colors">
                  <span>Voir les offres disponibles</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Carte pour les recruteurs */}
            <div 
              onClick={navigateToRecruteurs}
              className="card-premium hover-lift cursor-pointer group animate-fade-in-right"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center group-hover:bg-secondary-200 transition-colors">
                    <Handshake className="w-8 h-8 text-secondary" />
                  </div>
                  <div className="w-8 h-1 bg-gradient-royal"></div>
                </div>
                
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  Je cherche un employé
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Besoin d'un chauffeur de confiance, d'une nounou sérieuse ou d'un vigile compétent ? On vous présente les bonnes personnes.
                </p>
                
                <div className="flex items-center gap-2 text-secondary font-semibold group-hover:text-secondary-600 transition-colors">
                  <span>Trouver le bon profil</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION ABOUT LUXURY */}
      <section id="about" className="section bg-white">
        <div className="luxury-container">
          <div className="section-header animate-fade-in-up">
            <h2 className="section-title">
              Nos engagements
            </h2>
            <p className="section-subtitle">
              Voici ce qui nous définit et ce qui fait notre différence
            </p>
            <div className="section-divider"></div>
          </div>

          <div className="grid-3 max-w-6xl mx-auto">
            {aboutCommitments.map((commitment, index) => (
              <div 
                key={index}
                className="text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                  <div className="text-primary">
                    {commitment.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                  {commitment.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {commitment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION CONTACT LUXURY */}
      <section id="contact" className="section bg-gradient-base">
        <div className="luxury-container">
          <div className="section-header animate-fade-in-up">
            <h2 className="section-title">
              Contactez-nous
            </h2>
            <p className="section-subtitle">
              Une question ? Besoin d'aide ? On est là pour vous accompagner
            </p>
            <div className="section-divider"></div>
          </div>

          <div className="grid-2 max-w-6xl mx-auto">
            {/* Formulaire de contact luxury */}
            <div className="card-premium animate-fade-in-left">
              <div className="p-8">
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-primary" />
                  Envoyez-nous un message
                </h3>
                
                {showSuccessMessage && (
                  <div className="success-state mb-6">
                    <CheckCircle className="w-5 h-5" />
                    <span>Votre message a été envoyé avec succès !</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                      <input
                        type="text"
                        name="firstName"
                        value={contactForm.firstName}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                      <input
                        type="text"
                        name="lastName"
                        value={contactForm.lastName}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="+225 XX XX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vous êtes</label>
                    <select
                      name="service"
                      value={contactForm.service}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionnez votre situation</option>
                      <option value="candidat">Je cherche un emploi</option>
                      <option value="recruteur">Je cherche un employé</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleFormChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      placeholder="Décrivez votre besoin en quelques mots..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Informations de contact luxury */}
            <div className="space-y-8 animate-fade-in-right">
              <div className="card">
                <div className="p-8">
                  <h3 className="text-2xl font-display font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <Star className="w-6 h-6 text-secondary" />
                    Nos coordonnées
                  </h3>
                  
                  <div className="space-y-6">
                    {contactItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 font-medium">{item.title}</div>
                          <div className="font-semibold text-gray-900">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to action luxury */}
              <div className="card-premium bg-gradient-royal p-8 text-white text-center">
                <div className="mb-4">
                  <Award className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4">Prêt à commencer ?</h3>
                <p className="mb-6 opacity-90">
                  Contactez-nous dès maintenant pour discuter de vos besoins
                </p>
                <button
                  onClick={scrollToContact}
                  className="btn-gold"
                >
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;