import React from 'react'
import { Helmet } from "react-helmet";

const Header = () => {
    return (
        <Helmet>
          <title>tech-Challenge</title>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;500;700&display=swap" rel="stylesheet"/>  
          <link href="https://fonts.googleapis.com/css2?family=MuseoModerno:wght@400;500;600&display=swap" rel="stylesheet"/>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"/>
          <link rel="stylesheet" href="/stylesheets/homePage.css"/>
      </Helmet>
    )
}
export default Header