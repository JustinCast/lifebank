import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Link as LinkRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import QRCode from 'qrcode.react'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  contentHeader: {
    position: 'relative',
    height: 'auto',
    width: '100%',
    marginBottom: '40px'
  },
  titleProfile: {
    padding: theme.spacing(0, 2),
    width: '65%',
    fontFamily: 'Roboto',
    fontSize: '34px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.18',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.87)',
    marginTop: '10px',
    marginBottom: '4px',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
    }
  },
  subtitleProfile: {
    padding: theme.spacing(0, 2),
    width: '100%',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'left'
  },
  avatarRoundDesktop: {
    width: '80px',
    height: '80px',
    marginBottom: '5px'
  },
  heart: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 0,
    width: '100px',
    fontSize: 275,
    animation: '$heartbeat 1.4s linear infinite',
    [theme.breakpoints.up('md')]: {
      width: '100px'
    }
  },
  tokensBox: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  rowBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2),
    alignItems: 'center',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
    }
  },
  divider: {
    width: '100%'
  },
  routerLink: {
    width: "100%",
    textDecoration: "none",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  editBtn: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "70%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 20,
  },
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2) * -1
  },
  boxQr: {
    marginTop: '20px',
    marginBottom: '20px'
  }
}))


const EmptyHeartSVG = ({ balance }) => {
  const classes = useStyles()
  const textColor = balance ? '#ffffff' : '#000000'

  return (
    <svg viewBox="0 0 800 700" className={classes.heart}>
      <path
        fill="#B71C1C"
        d="M514.672,106.17c-45.701,0-88.395,22.526-114.661,59.024c-26.284-36.505-68.981-59.024-114.683-59.024C207.405,106.17,144,169.564,144,247.5c0,94.381,57.64,144.885,124.387,203.358c38.983,34.149,83.17,72.856,119.654,125.332l12.267,17.641l11.854-17.924c35.312-53.388,78.523-91.695,120.305-128.734C596.006,390.855,656,337.654,656,247.5C656,169.564,592.604,106.17,514.672,106.17z M513.143,425.371c-36.93,32.729-78.27,69.373-113.402,117.391c-35.717-46.873-76.089-82.242-112.148-113.834c-63.944-56.01-114.447-100.26-114.447-181.428c0-61.868,50.325-112.186,112.184-112.186c43.196,0,83.034,25.395,101.491,64.697l13.191,28.105l13.19-28.112c18.443-39.303,58.273-64.69,101.472-64.69c61.866,0,112.185,50.317,112.185,112.186C626.856,324.548,576.673,369.047,513.143,425.371z"
      />
      {balance && (
        <g transform="translate(150, 200)">
          <path
            fill="#B71C1C"
            d="M 10,30 A 25,22 0,0,1 250,10 A 25,20 0,0,1 480,10 Q 550,80 240,360 Q 10,150 10,30 z"
          />
        </g>
      )}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="200"
        fontFamily="Roboto"
        textRendering="geometricPrecision"
        lengthAdjust="spacingAndGlyphs"
        fill={textColor}
      >
        {balance}
      </text>
    </svg>
  )
}

EmptyHeartSVG.propTypes = {
  balance: PropTypes.number,
}

const ProfilePageDonor = ({ profile, onConsentChange, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <>
      <Box className={classes.contentHeader}>
        <Typography className={classes.titleProfile} noWrap>{profile.name}</Typography>
        <Typography className={classes.subtitleProfile} noWrap>{profile.account}</Typography>
        <Typography className={classes.subtitleProfile} noWrap>{t('rolesTitle.singular.donor')}</Typography>
        <EmptyHeartSVG balance={parseInt((profile.balance.join(',').split(' ')[0]))} isDesktop />
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('common.email')}</Typography>
        <Typography >{profile.email.toLowerCase() || 'N/A'}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">
          {t('miscellaneous.communities')}
        </Typography>
        <Typography variant="body1">
          {(profile.communities || []).join(', ') || 'N/A'}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">
          {t('profile.consentStatus')}
        </Typography>
        <FormGroup row className={classes.formGroup}>
          {!loading && (
            <FormControlLabel
              control={
                <Switch
                  name="checkedB"
                  color="primary"
                  checked={profile.consent || false}
                  onChange={onConsentChange}
                />
              }
              label={profile.consent ? 'Granted' : 'Revoked'}
            />
          )}
          {loading && <CircularProgress size={16} />}
        </FormGroup>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.boxQr}>
        <QRCode value={profile.account || 'n/a'} size={200} />
      </Box>
      <LinkRouter to={{ pathname: '/edit-profile', state: { isCompleting: true, userName: '' } }} className={classes.routerLink} >
        <Button variant="contained" className={classes.editBtn} color="primary">
          {t('common.edit')}
        </Button>
      </LinkRouter>
    </>
  )
}

ProfilePageDonor.propTypes = {
  profile: PropTypes.object,
  onConsentChange: PropTypes.func,
  loading: PropTypes.bool
}

export default ProfilePageDonor
