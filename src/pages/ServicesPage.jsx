import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function ServicesPage() {
  return (
    <Container
      sx={{
        mt: 5,
        pb: 4,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}>
      <Typography
        variant='h1'
        fontSize={35}
        align='center'
        fontWeight={400}
        gutterBottom>
        Our Services
      </Typography>
      <Container className='TextPhoto'>
        <Box>
          <Typography
            className='welcome'
            variant='h2'
            fontSize={25}
            align='center'
            textAlign={"justify"}
            gutterBottom>
            Welcome to our dental clinic! We are pleased to introduce you to a
            space where oral health is our top priority. At Happy Smile, we
            understand that a healthy, radiant smile can make all the difference
            in your life and your personal confidence.
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 4,
            display: "grid",
            gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
            gap: "3em",
          }}>
          <Card
            sx={{
              minWidth: 200,
            }}>
            <CardMedia
              component='img'
              height='140'
              image='public/images/limpieza.jpg'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Regular Exams and Cleanings
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Regular dental check-ups to detect early dental problems and
                professional cleanings to remove plaque and tartar.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 200,
            }}>
            <CardMedia
              component='img'
              height='140'
              image='public/images/odontologia.jpg'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Caries Treatments
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Dental fillings and treatments to repair teeth damaged by
                cavities.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 200,
            }}>
            <CardMedia
              component='img'
              height='140'
              image='public/images/niños.jpg'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Care for Children
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Dental care for children, including dental sealants and
                treatments to prevent cavities.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 200,
            }}>
            <CardMedia
              component='img'
              height='140'
              image='public/images/ortodoncia.jpg'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Orthodontic Treatments
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Placement of orthodontic appliances to correct the alignment and
                bite of the teeth.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 200,
            }}>
            <CardMedia
              component='img'
              height='140'
              image='public/images/estetica.jpg'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Cosmetic Dental Procedures
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Teeth whitening, dental veneers and cosmetic restorations to
                improve the appearance of teeth.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 200,
            }}>
            <CardMedia
              component='img'
              height='140'
              image='public/images/dentadura.jpg'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Dentures
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Fabrication and adjustment of partial or complete dentures to
                replace missing teeth.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Container>
  );
}
