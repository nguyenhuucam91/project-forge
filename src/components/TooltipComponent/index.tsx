import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'rgba(60, 60, 60, 0.87)',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    fontSize: 12,
    padding: 8
  }
}))
export default function TooltipComponent({ children, ...prop }: TooltipProps) {
  return <LightTooltip {...prop}>{children}</LightTooltip>
}
