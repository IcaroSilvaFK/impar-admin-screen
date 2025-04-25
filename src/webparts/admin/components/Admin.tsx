import { WebPartContext } from '@microsoft/sp-webpart-base';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { Accordion, AccordionDetails, accordionSummaryClasses, AccordionSummaryProps, Alert, Box, CircularProgress, Container, Divider, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AccordionSummary as MuiAccordionSummary, Stack, styled, Typography } from '@mui/material';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { AdminService } from '../../../services/admin.service';


const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
  {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },

}));

type Props = {
  context: WebPartContext
  title: string
  description: string
  welcomeMessage: string
  errorMessage: string
}

type Items = {
  Title: string
  ID: number
  Description: string
  Category: string
  Link: string
}

export default function Admin(props: Props) {
  const { context, title, description, welcomeMessage, errorMessage } = props

  const [items, setItems] = useState<Map<string, Items[]>>(new Map)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const adminService = new AdminService(context)

  const getAdminItems = useCallback(async () => {
    try {
      setIsLoading(true)
      const result = await adminService.getAdminItems()
      setItems(result)
    } catch (err) {
      console.log(err)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getAdminItems()
  }, [])

  return (
    <Container>
      <Alert icon={<WavingHandIcon fontSize="inherit" />} severity="success">
        {welcomeMessage}
      </Alert>
      <Box py={2}>
        <Typography variant="h4" component="h2">{title}</Typography>
        <Typography variant="caption" color="textSecondary" py={1}>{description}</Typography>
      </Box>
      {
        isError && (
          <Alert severity="error">{errorMessage}</Alert>
        )
      }
      {
        isLoading && (
          <Stack width="100%" justifyContent="center" alignItems="center" py={1}>
            <CircularProgress />
          </Stack>
        )
      }
      {
        !isLoading && Array.from(items).map(([key, items], idx) => (
          <Accordion key={key} >
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography component="span">{key} #{idx + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {
                  items.map(item => (
                    <>
                      <Link underline="none" color="inherit" key={item.ID} href={item.Link}>
                        <ListItem>
                          <ListItemButton>
                            <ListItemIcon>
                              <MiscellaneousServicesIcon />
                            </ListItemIcon>
                            <ListItemText>
                              {item.Title} - {item.Description}
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      <Divider variant="inset" component="li" />
                    </>
                  ))
                }
              </List>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </Container>
  )
}