import { graphql, StaticQuery } from "gatsby"
import React from "react"
import RecentPosts from "../components/blogpost/recent-posts"
import Hero from "../components/hero"
import MainLayout from "../components/layout"
import IntroSection from "../components/section/intro"
import SEO from "../components/seo"
import ProductCarousel from "../components/shop/carousel"
import SocialFeed from "../components/social-feed"

const IndexPage = () => {
  const IG_LINK = "https://www.instagram.com/nayaequalsnew/"
  const IG_FEED_DESCRPT = "Sjekk ut de tre siste innleggene "
  return (
    <StaticQuery
      query={query}
      render={data => {
        const { hero, introsection, showcase } = data.wpPage
        return (
          <MainLayout>
            <SEO title="NAYAA" />
            <Hero
              hasText={true}
              desktopImage={hero.heroimagedesktop.localFile}
              mobileImage={hero.heroimagemobile.localFile}
              title={hero.herotitle}
              fullHeight
            />
            <IntroSection
              title={introsection.introtitle}
              description={introsection.introdescription}
              image={introsection.introimage.localFile}
              haslink
            />
            <ProductCarousel
              title={showcase.showcasetitle}
              description={showcase.showcasedescription}
              items={[showcase.imageOne, showcase.imageTwo]}
            />
            <RecentPosts dark />
            <SocialFeed globalLink={IG_LINK} description={IG_FEED_DESCRPT} />
          </MainLayout>
        )
      }}
    />
  )
}

export default IndexPage

const query = graphql`
  query IndexQuery {
    wpPage(id: { eq: "cG9zdDozMzM5" }) {
      title
      hero {
        herotitle
        heroimagemobile {
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        heroimagedesktop {
          localFile {
            childImageSharp {
              fluid(maxWidth: 2400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      introsection {
        introtitle
        introdescription
        introimage {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      showcase: productPreviewImages {
        imageOne {
          ... on WpMediaItem {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        imageTwo {
          ... on WpMediaItem {
            id
            title
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        showcasetitle
        showcasedescription
      }
    }
  }
`
