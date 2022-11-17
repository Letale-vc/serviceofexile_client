import { FC, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import PublicProfileServiceList from './public-profile-service-list/public-profile-service-list'
import PublicProfileMenu from './public-profile-menu'
import styled from '@emotion/styled'
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { profileApi } from '../../api/api'
import { useTypeDispatch } from '../../redux/hooks'

const Span = styled('span')(() => ({
  color: '#fff8e1'
}))

const PublicProfile: FC = () => {
  return <div>THIS PUBLIC</div>
  // const [publicProfile, setPublicProfile] = useState<UserResponse | null>(null)
  // const profile = useSelector((state: RootState) => state.profile.profile)
  // const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  // const isFetching = useSelector((state: RootState) => state.profile.isFetching)
  // const data = useSelector((state: RootState) => state.data.data)
  // const { accountName }: { accountName?: string } = useParams()
  // const dispatch = useTypeDispatch()
  // const PublicProfileServiceListMap = () => {
  //   if (publicProfile) {
  //     Object.keys(data.serviceCategoryNames).forEach((el) =>
  //       publicProfile.services
  //         .filter((el1) => el1.serviceName.serviceCategory.name === el)
  //         .map((e) => (
  //           <PublicProfileServiceList
  //             service={e}
  //             characterName={publicProfile.characterName}
  //             key={e.uuid}
  //           />
  //         ))
  //     )
  //   }
  // }
  // const giveVoutch = () => {
  //   console.log('vouch')
  // }
  // useEffect(() => {
  //   const fetchPublicProfile = async () => {
  //     const user = await profileApi.getPublicProfile(accountName)
  //     setPublicProfile(user.data)
  //   }
  //   if (isAuth === true && publicProfile === null) {
  //     dispatch(setUserProfileThunk())
  //   }
  //   if (publicProfile === null || publicProfile.accountName !== accountName) {
  //     void fetchPublicProfile()
  //   }
  // }, [isAuth, publicProfile, dispatch, accountName])
  // if (isAuth === false) {
  //   return <Redirect to="/login" />
  // } else if (isFetching === true) {
  //   return (
  //     <Box display="flex" pt={10} justifyContent="center">
  //       <CircularProgress />
  //     </Box>
  //   )
  // }
  // if (accountName && !publicProfile) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center' }}>
  //       User not found
  //     </Box>
  //   )
  // }
  // return (
  //   <Box>
  //     {publicProfile ? (
  //       <>
  //         <Paper
  //           sx={{
  //             width: '100%',
  //             padding: 2,
  //             backgroundSize: '1,2',
  //             flexGrow: 1,
  //             display: 'flex',
  //             flexWrap: 'wrap'
  //           }}
  //         >
  //           <Box width="60%">
  //             <Typography variant="h5" sx={{ marginBottom: 2 }}>
  //               {publicProfile?.accountName}
  //             </Typography>
  //             <Typography>
  //               Character name: <Span>{publicProfile?.characterName}</Span>
  //             </Typography>
  //             <Box sx={{ display: 'flex' }}>
  //               <Typography>
  //                 Discord: <Span>{publicProfile?.discord}</Span>
  //               </Typography>{' '}
  //             </Box>
  //           </Box>
  //           <Box
  //             sx={{
  //               flexGrow: 1,
  //               width: '30%',
  //               display: 'flex',
  //               flexWrap: 'wrap',
  //               alignItems: 'center'
  //             }}
  //           >
  //             <Box sx={{ paddingRight: 3 }}>
  //               <Typography variant="h6">
  //                 Vouch: <Span>{publicProfile?.vouches.vouches_all_count}</Span>
  //               </Typography>
  //             </Box>
  //             {/* {profile?.accountName !== publicProfile?.accountName ? (
  //               <Box>
  //                 {publicProfile?.ifVouchThisUser === false ? (
  //                   <Button
  //                     variant="outlined"
  //                     startIcon={<ThumbUpAltIcon />}
  //                     onClick={giveVoutch}
  //                   >
  //                     Give vouch
  //                   </Button>
  //                 ) : (
  //                   <Typography variant="button" color="green">
  //                     Already Vouched
  //                   </Typography>
  //                 )}
  //               </Box>
  //             ) : null} */}
  //           </Box>
  //           {profile?.accountName !== publicProfile?.accountName ? (
  //             <PublicProfileMenu accountProfile={publicProfile?.accountName} />
  //           ) : null}
  //         </Paper>
  //         <Box paddingTop={1}> {PublicProfileServiceListMap()}</Box>
  //       </>
  //     ) : null}
  //   </Box>
  // )
}
export default PublicProfile
