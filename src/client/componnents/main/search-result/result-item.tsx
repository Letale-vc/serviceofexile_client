// import { FC, useState } from 'react'
// import { useCopyToClipboard } from 'react-use'
// import { Link, NavLink } from 'react-router-dom'
// import { Box, Button, styled, Typography, useTheme } from '@mui/material'
// import { amber } from '@mui/material/colors'

// const Span = styled('span')(() => ({}))

// const SalesItem = ({ serviceOne, data, serviceSelectSearchData }) => {
//   const theme = useTheme()

//   const { user, serviceNameId, price, currency, bulk } = serviceOne
//   const { accountName, discord, characterName, vouchCount } = user
//   const [copyState, setCopyState] = useState('Whisper')

//   const [, copyToClipboard] = useCopyToClipboard()
//   const serviceName = serviceSelectSearchData?.serviceName.find(
//     (el) => el.id === serviceNameId
//   )?.name
//   const copy = `@${characterName} Hi, I'd like to buy your ${serviceName} for my ${price} ${currency}`

//   const clickCopy = () => {
//     copyToClipboard(copy)
//     setCopyState('Copied...')
//   }
//   return (
//     <Box
//       sx={{
//         borderBottom: `2px solid rgba(255, 255, 255, 0.1)`,
//         background: `rgba(15, 15, 15, 0.8)`,
//         padding: theme.spacing(1),
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         transition: `opacity 0.5s`,
//         [theme.breakpoints.down('md')]: {
//           display: 'block'
//         },
//         ':nth-of-type(even)': {
//           background: `rgba(25, 25, 25, 0.8)`
//         }
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-around',
//           alignItems: 'center',
//           width: '60%',
//           textAlign: 'center',
//           [theme.breakpoints.down('md')]: {
//             width: '100%'
//           }
//         }}
//       >
//         <Box sx={{ width: '80%' }}>
//           <Typography align="center">{serviceName}</Typography>
//           <Box
//             width="100%"
//             sx={{ display: 'flex', justifyContent: 'center', paddingTop: 2 }}
//           >
//             <Box pl={0.4} width="100%">
//               {currency === data.currency[0].name ? (
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center'
//                   }}
//                 >
//                   <Typography>
//                     {price} <span> × </span>{' '}
//                   </Typography>
//                   <img
//                     // src={chaos}
//                     style={{
//                       maxWidth: 35
//                     }}
//                     alt="chaos"
//                   />
//                   <Typography>Chaos Orb</Typography>
//                 </Box>
//               ) : (
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'centert'
//                   }}
//                 >
//                   <Typography>
//                     {price} <span>× </span>{' '}
//                   </Typography>{' '}
//                   <img
//                     // src={exalted}
//                     style={{
//                       maxWidth: 30
//                     }}
//                     alt="exalted"
//                   />
//                   &nbsp;<Typography>Exalted Orb</Typography>
//                 </Box>
//               )}
//             </Box>
//           </Box>
//         </Box>
//         <Box
//           sx={{
//             display: 'flex',
//             width: '20%',
//             justifyContent: 'flex-start',
//             alignItems: 'center'
//           }}
//         >
//           {bulk ? (
//             <>
//               <Typography>Bulk: {bulk}</Typography>
//             </>
//           ) : null}
//         </Box>
//       </Box>
//       <Box
//         sx={{
//           width: '40%',
//           display: 'flex',
//           alignItems: 'center',
//           [theme.breakpoints.down('md')]: {
//             width: '100%',
//             justifyContent: 'center',
//             marginTop: theme.spacing(2)
//           }
//         }}
//       >
//         <Box
//           sx={{
//             flex: '1 0 auto',
//             width: '50%',
//             [theme.breakpoints.down('md')]: {
//               flex: 'none'
//             }
//           }}
//         >
//           <Box>
//             <Typography>
//               Account name:{' '}
//               <Link
//                 // underline="none"
//                 // sx={{
//                 //   '&:hover': {
//                 //     cursor: 'pointer',
//                 //     color: amber[300]
//                 //   }
//                 // }}
//                 component={NavLink}
//                 to={`/public/${accountName}`}
//               >
//                 {accountName}
//               </Link>
//             </Typography>
//             <Typography>
//               Discord: <Span>{discord}</Span>
//             </Typography>
//           </Box>
//           <Box>
//             <Typography>
//               IGN : <Span>{characterName}</Span>
//             </Typography>
//           </Box>
//         </Box>
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <Typography>Vouch: {vouchCount.vouchService} </Typography>
//           {vouchCount.vouchTFT ? (
//             <Typography>TFT vouch: {vouchCount.vouchTFT} </Typography>
//           ) : null}
//         </Box>
//         <Box
//           sx={{
//             flex: '1 0 auto',
//             textAlign: 'center',
//             [theme.breakpoints.down('md')]: {
//               flex: 'none',
//               marginLeft: theme.spacing(3)
//             }
//           }}
//         >
//           <Button
//             sx={{ width: '76px' }}
//             variant="contained"
//             color="primary"
//             onClick={clickCopy}
//           >
//             {copyState}
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   )
// }

// export default SalesItem
