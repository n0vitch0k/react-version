/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1280px',
			},
		},
		extend: {
			// Nouvelles couleurs Christ-Roi
			colors: {
				// Couleurs de base sauvegardées pour shadcn/ui
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				// Palette Christ-Roi
				primary: {
					50: '#EEF2FF',
					100: '#E0E7FF',
					200: '#C7D2FE',
					300: '#A5B4FC',
					400: '#818CF8',
					500: '#4169E1',
					600: '#3A5ED6',
					700: '#2F4CC6',
					800: '#3730A3',
					900: '#312E81',
					DEFAULT: '#4169E1',
					foreground: '#ffffff',
				},
				secondary: {
					50: '#FFFBEB',
					100: '#FEF3C7',
					200: '#FDE68A',
					300: '#FCD34D',
					400: '#FBBF24',
					500: '#e1b941',
					600: '#D2A837',
					700: '#B88F2D',
					800: '#92400E',
					900: '#78350F',
					DEFAULT: '#e1b941',
					foreground: '#111827',
				},
				base: {
					50: '#FFFFFF',
					100: '#FAFAF8',
					200: '#F7F6F2',
					300: '#F5F4F0',
					400: '#F0EFEB',
					500: '#FAFAF8',
					DEFAULT: '#FAFAF8',
				},
				gray: {
					50: '#F9FAFB',
					100: '#F3F4F6',
					200: '#E5E7EB',
					300: '#D1D5DB',
					400: '#9CA3AF',
					500: '#6B7280',
					600: '#4B5563',
					700: '#374151',
					800: '#1F2937',
					900: '#111827',
				},
				success: {
					50: '#ECFDF5',
					100: '#D1FAE5',
					500: '#059669',
					600: '#047857',
					700: '#065F46',
					DEFAULT: '#059669',
				},
				warning: {
					50: '#FFFBEB',
					100: '#FEF3C7',
					500: '#D97706',
					600: '#B45309',
					700: '#92400E',
					DEFAULT: '#D97706',
				},
				error: {
					50: '#FEF2F2',
					100: '#FEE2E2',
					500: '#DC2626',
					600: '#B91C1C',
					700: '#991B1B',
					DEFAULT: '#DC2626',
				},
				info: {
					50: '#EFF6FF',
					100: '#DBEAFE',
					500: '#2563EB',
					600: '#1D4ED8',
					700: '#1E40AF',
					DEFAULT: '#2563EB',
				},
				
				// Legacy colors for shadcn/ui compatibility
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
			},
			
			// Polices
			fontFamily: {
				display: ['Playfair Display', 'serif'],
				body: ['Lato', 'sans-serif'],
				sans: ['Lato', 'system-ui', 'sans-serif'],
				serif: ['Playfair Display', 'Georgia', 'serif'],
			},
			
			// Tailles de police
			fontSize: {
				'xs': ['0.75rem', { 'lineHeight': '1rem' }],
				'sm': ['0.875rem', { 'lineHeight': '1.25rem' }],
				'base': ['1rem', { 'lineHeight': '1.5rem' }],
				'lg': ['1.125rem', { 'lineHeight': '1.75rem' }],
				'xl': ['1.25rem', { 'lineHeight': '1.75rem' }],
				'2xl': ['1.5rem', { 'lineHeight': '2rem' }],
				'3xl': ['1.875rem', { 'lineHeight': '2.25rem' }],
				'4xl': ['2.25rem', { 'lineHeight': '2.5rem' }],
				'5xl': ['3rem', { 'lineHeight': '1.1' }],
				'6xl': ['3.75rem', { 'lineHeight': '1.1' }],
				'7xl': ['4.5rem', { 'lineHeight': '1.1' }],
				'8xl': ['6rem', { 'lineHeight': '1.1' }],
				'9xl': ['8rem', { 'lineHeight': '1.1' }],
				'hero': ['clamp(3rem, 6vw, 5rem)', { 'lineHeight': '1.1', 'fontWeight': '700' }],
				'section': ['clamp(2rem, 4vw, 3rem)', { 'lineHeight': '1.2', 'fontWeight': '600' }],
				'subsection': ['clamp(1.5rem, 3vw, 2rem)', { 'lineHeight': '1.3', 'fontWeight': '600' }],
			},
			
			// Espacement généreux
			spacing: {
				'0': '0',
				'1': '0.25rem',
				'2': '0.5rem',
				'3': '0.75rem',
				'4': '1rem',
				'5': '1.25rem',
				'6': '1.5rem',
				'8': '2rem',
				'10': '2.5rem',
				'12': '3rem',
				'16': '4rem',
				'20': '5rem',
				'24': '6rem',
				'28': '7rem',
				'32': '8rem',
				'36': '9rem',
				'40': '10rem',
				'44': '11rem',
				'48': '12rem',
				'52': '13rem',
				'56': '14rem',
				'60': '15rem',
				'64': '16rem',
				'72': '18rem',
				'80': '20rem',
				'96': '24rem',
			},
			
			// Bordures arrondies luxury
			borderRadius: {
				'none': '0',
				'sm': '0.125rem',
				'DEFAULT': '0.25rem',
				'md': '0.375rem',
				'lg': '0.5rem',
				'xl': '0.75rem',
				'2xl': '1rem',
				'3xl': '1.5rem',
				'full': '9999px',
			},
			
			// Ombres luxury
			boxShadow: {
				'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
				'primary': '0 10px 15px -3px rgba(65, 105, 225, 0.2), 0 4px 6px -2px rgba(65, 105, 225, 0.1)',
				'gold': '0 10px 15px -3px rgba(225, 185, 65, 0.2), 0 4px 6px -2px rgba(225, 185, 65, 0.1)',
				'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)',
			},
			
			// Backgrounds
			backgroundImage: {
				'gradient-royal': 'linear-gradient(135deg, #4169E1 0%, #e1b941 100%)',
				'gradient-royal-light': 'linear-gradient(135deg, #5B7CE8 0%, #F5D56E 100%)',
				'gradient-hero': 'linear-gradient(135deg, rgba(65,105,225,0.9) 0%, rgba(225,185,65,0.8) 100%)',
				'gradient-base': 'linear-gradient(180deg, #FAFAF8 0%, #F7F6F2 100%)',
				'gradient-card': 'linear-gradient(145deg, #FFFFFF 0%, #FAFAF8 100%)',
				'textured': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
			},
			
			backgroundSize: {
				'textured': '20px 20px',
				'textured-fine': '15px 15px',
			},
			
			// Animations
			animation: {
				'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'fade-in-left': 'fadeInLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'fade-in-right': 'fadeInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'skeleton-loading': 'skeleton-loading 1.5s infinite',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'bounce-slow': 'bounce 2s infinite',
				'spin-slow': 'spin 2s linear infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			
			// Keyframes
			keyframes: {
				fadeInUp: {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				fadeInLeft: {
					'0%': {
						opacity: '0',
						transform: 'translateX(-30px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				fadeInRight: {
					'0%': {
						opacity: '0',
						transform: 'translateX(30px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				'skeleton-loading': {
					'0%': {
						'background-position': '200% 0',
					},
					'100%': {
						'background-position': '-200% 0',
					},
				},
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			
			// Transitions
			transitionTimingFunction: {
				'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
			
			// Durées de transition
			transitionDuration: {
				'75': '75ms',
				'100': '100ms',
				'150': '150ms',
				'200': '200ms',
				'300': '300ms',
				'500': '500ms',
				'700': '700ms',
				'1000': '1000ms',
			},
			
			// Blur effects
			backdropBlur: {
				'xs': '2px',
				'sm': '4px',
				'DEFAULT': '8px',
				'md': '12px',
				'lg': '16px',
				'xl': '24px',
				'2xl': '40px',
				'3xl': '64px',
			},
			
			// Z-index
			zIndex: {
				'auto': 'auto',
				'0': '0',
				'10': '10',
				'20': '20',
				'30': '30',
				'40': '40',
				'50': '50',
				'60': '60',
				'70': '70',
				'80': '80',
				'90': '90',
				'100': '100',
				'modal': '1000',
				'dropdown': '1000',
				'sticky': '1020',
				'fixed': '1030',
				'modal-backdrop': '1040',
				'popover': '1050',
				'tooltip': '1060',
				'toast': '1070',
			},
			
			// Screen sizes
			screens: {
				'xs': '475px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		// Plugin pour les classes d'animation avec délai
		function({ addUtilities, theme }) {
			const delays = {
				'100': '0.1s',
				'200': '0.2s',
				'300': '0.3s',
				'400': '0.4s',
				'500': '0.5s',
				'600': '0.6s',
			};
			
			const animationUtilities = {};
			Object.entries(delays).forEach(([key, value]) => {
				animationUtilities[`.animate-delay-${key}`] = {
					animationDelay: value,
				};
			});
			
			addUtilities(animationUtilities);
		},
	],
}