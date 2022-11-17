// import { FC, useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import InfiniteScroll from 'react-infinite-scroll-component'
// import { RootState } from '../../../redux/store'
// import SalesItem from './result-item'
// import { Box, CircularProgress, Typography, useTheme } from '@mui/material'
// import { useTypeSelector } from '../../../redux/hooks'

// interface PropsType {
//   serviceSelectSearchData: undefined
// }

// const SearchResult: FC<PropsType> = ({ data, serviceSelectSearchData }) => {
//   const theme = useTheme()
//   const [numShow, setNumShow] = useState(10)
//   const [hasMore, sethasMore] = useState(true)
//   const salesList = useTypeSelector((state) => state.services.services)
//   const isServiceFound: null | boolean = useSelector(
//     (state: RootState) => state.services.isServiceFound
//   )

//   const [items, setItems] = useState(salesList.rows.slice(0, numShow))

//   useEffect(() => {
//     if (salesList.rows.length > 0) {
//       setItems(salesList.rows.slice(0, numShow))
//     }
//     if (salesList.rows.length !== items.length) {
//       if (salesList.rows.length === 0) {
//         setItems([])
//       }
//       sethasMore(true)
//     } else {
//       sethasMore(false)
//     }
//   }, [items.length, numShow, salesList.rows])

//   const fetchMoreData = () => {
//     if (items.length === salesList.rows.length) {
//       sethasMore(false)
//     }
//     setNumShow(numShow + 5)
//     setItems(salesList.rows.slice(0, numShow))
//   }

//   return (
//     <>
//       {isServiceFound === false ? (
//         <Box
//           sx={{
//             borderBottom: `2px solid rgba(255, 255, 255, 0.1)`,
//             background: `rgba(15, 15, 15, 0.8)`,
//             padding: theme.spacing(1),
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             transition: `opacity 0.5s`,
//             ':nth-of-type(even)': {
//               background: `rgba(25, 25, 25, 0.8)`
//             },
//             [theme.breakpoints.down('md')]: {
//               display: 'block'
//             }
//           }}
//         >
//           <Typography> No search results</Typography>
//         </Box>
//       ) : (
//         <>
//           {salesList.count !== 0 ? (
//             <Box
//               sx={{
//                 borderBottom: `2px solid rgba(255, 255, 255, 0.1)`,
//                 borderTop: `2px solid rgba(255, 255, 255, 0.1)`,
//                 background: `rgba(25, 25, 25, 0.8)`,
//                 padding: theme.spacing(1),
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transition: `opacity 0.5s`
//               }}
//             >
//               <Typography>Total: {salesList.count}</Typography>
//             </Box>
//           ) : null}
//           <InfiniteScroll
//             dataLength={items.length}
//             hasMore={hasMore}
//             next={fetchMoreData}
//             loader={
//               <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <CircularProgress />
//               </Box>
//             }
//           >
//             {items.map((serviceOne) => (
//               <SalesItem
//                 serviceOne={serviceOne}
//                 key={serviceOne.uuid}
//                 serviceSelectSearchData={serviceSelectSearchData}
//                 data={data}
//               />
//             ))}
//           </InfiniteScroll>

//           {salesList.rows.length !== items.length ? (
//             <Box
//               sx={{
//                 borderBottom: `2px solid rgba(255, 255, 255, 0.1)`,
//                 borderTop: `2px solid rgba(255, 255, 255, 0.1)`,
//                 background: `rgba(25, 25, 25, 0.8)`,
//                 padding: theme.spacing(1),
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transition: `opacity 0.5s`,
//                 '&:hover': {
//                   cursor: 'pointer',
//                   background: `rgba(35, 35, 35, 0.8)`
//                 }
//               }}
//               onClick={fetchMoreData}
//             >
//               <Typography>Load more... </Typography>
//             </Box>
//           ) : null}
//         </>
//       )}
//     </>
//   )
// }

// export default SearchResult
