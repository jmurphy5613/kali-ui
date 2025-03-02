import { Flex, Text, Box } from './elements'

export default function Info({ heading, children, props }) {
  return (
    <Box>
      <Box
        css={{
          fontFamily: 'Screen',
          fontWeight: '700',
          fontSize: '24px',
          border: '1px solid $gray6',
          borderTopLeftRadius: '25px',
          borderTopRightRadius: '25px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
          minWidth: '15rem',
          overflow: 'hidden',
          padding: '1rem 1rem 0.5rem 1rem',
        }}
      >
        {heading}
      </Box>
      <Box
        css={{
          padding: '1rem',
          border: '1px solid $gray6',
          borderBottomLeftRadius: '25px',
          borderBottomRightRadius: '25px',
          minWidth: '15rem',
          overflow: 'hidden',
          padding: '1rem',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
