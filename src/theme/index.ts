import { createMuiTheme } from '@material-ui/core'

/**main colors */
export const mainColor = '#B5CBB7'
export const mainHeavyColor = '#818479'

/**secondary colors */
export const secondaryColor = '#E4E9B2'
export const secondaryHeavyColor = '#D2E4C4'

/**functional colors */
export const warningColor = '#f4a261'
export const errorColor = '#e76f51'
export const succColor = '#2a9d8f'
export const failColor = errorColor
export const fillingColor = '#F7F9F9'

export const theme = createMuiTheme({
	typography: {
		fontFamily: 'Lexend'
	},
	palette: {
		primary: {
			main: mainColor
		},
		secondary: {
			main: secondaryColor
		}
	},
	overrides: {
		MuiTextField: {
			root: {
				'& .MuiOutlinedInput-root': {
					'& fieldset': {
						borderColor: mainColor
					},
					'&:hover fieldset': {
						borderColor: mainColor
					}
				}
			}
		}
	}
})
