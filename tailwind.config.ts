import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'orbitron': ['Orbitron', 'monospace'],
				'rajdhani': ['Rajdhani', 'sans-serif'],
			},
			colors: {
				// Cores base do sistema
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Cores tecnológicas do quiz
				'cyber': 'hsl(var(--azul-cibernetico))',
				'neon': 'hsl(var(--verde-neon))',
				'futurista': 'hsl(var(--laranja-futurista))',
				'digital': 'hsl(var(--roxo-digital))',
				'tech': 'hsl(var(--branco-tech))',
				'profundo': 'hsl(var(--preto-profundo))',
				'led': {
					vermelho: 'hsl(var(--led-vermelho))',
					amarelo: 'hsl(var(--led-amarelo))',
					azul: 'hsl(var(--led-azul))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'led-pisca': {
					'0%, 50%': { opacity: '1', boxShadow: '0 0 20px currentColor' },
					'51%, 100%': { opacity: '0.3', boxShadow: 'none' }
				},
				'cyber-glow': {
					'0%, 100%': { boxShadow: '0 0 5px hsl(var(--azul-cibernetico) / 0.5)' },
					'50%': { boxShadow: '0 0 25px hsl(var(--azul-cibernetico) / 0.8), 0 0 50px hsl(var(--azul-cibernetico) / 0.3)' }
				},
				'neon-pulse': {
					'0%, 100%': { textShadow: '0 0 5px hsl(var(--verde-neon) / 0.8)' },
					'50%': { textShadow: '0 0 20px hsl(var(--verde-neon)), 0 0 30px hsl(var(--verde-neon) / 0.5)' }
				},
				'glitch-text': {
					'0%': { transform: 'translateX(0)' },
					'20%': { transform: 'translateX(-2px)' },
					'40%': { transform: 'translateX(2px)' },
					'60%': { transform: 'translateX(-1px)' },
					'80%': { transform: 'translateX(1px)' },
					'100%': { transform: 'translateX(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'led-pisca': 'led-pisca 1.5s infinite',
				'cyber-glow': 'cyber-glow 2s ease-in-out infinite',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'glitch-text': 'glitch-text 0.3s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
