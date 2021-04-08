import { colors, makeStyles } from '@material-ui/core'
import { failColor, fillingColor, succColor } from 'theme'

type StyleConf = {
	isTimeout: boolean
	isFrozen: boolean
}
export const useTimeBoxPageStyles = makeStyles({
	container: {
		padding: '20px',
		marginTop: '50px',
		border: '1px solid',
		borderColor: colors.grey[300],
		borderRadius: '10px',
		minHeight: '60vh'
	}
})

export const useTimeBoxItemStyles = makeStyles({
	item: {
		transition: 'height 1s ease-in',
		opacity: (p: StyleConf) => (p.isFrozen ? 0.4 : 1),
		backgroundColor: fillingColor,
		borderRadius: '10px',
		marginBottom: '10px'
	},
	clockIcon: {
		backgroundColor: (p: StyleConf) => (p.isTimeout ? failColor : succColor)
	}
})
