library(dplyr)
library(rvest)
library(httr)
library(xml2)
library(stringr)
library(lubridate)
library(tictoc)

#### extract info volta rapida

extract_volta_rapida <- function(categoria = "originais"){
  ## categorias: originais, preparados, motos e 5-suv
  
  #function to parse milisec
  mili_sec <- function(string, index){
    substr(string, index, index) <- "."
    return(string)
  }
  
  #function to clean the youtube url
  clean_yt_link <- function(yt_link){
    
    yt_link_clean <- str_remove(yt_link, pattern = " ")
    
    if_else( 
      str_count(yt_link_clean, "youtube" ) > 1,
      str_sub(yt_link_clean, start = 33),
      yt_link_clean
    )
  }
  
  # compose the url
  url <- paste0("http://acelerados.tv/?fwp_ranking=", categoria,"&fwp_paged=")
  
  volta_rapida <- tibble() # empty dataset
  page <- 1 # initial number
  continue_scraping <- T # boolean to control return of page
  
  #start loop while return results
  while (continue_scraping) {
    url_aux <- paste0(url, page)  
    cat(url_aux)
    loaded_page <- 
      url_aux %>%
      read_html()
    
    carro <- 
      loaded_page %>% 
      html_nodes(xpath='//*[@class="volta-title"]') %>% 
      html_text() %>% 
      str_remove_all(pattern = "\\n|\\t") %>% 
      str_sub(end = -2)
    
    continue_scraping <- length(carro) > 0
    
    if (continue_scraping) {
      tempo <- 
        loaded_page %>% 
        html_nodes(xpath='//*[@class="volta-tempo"]') %>% 
        html_text() %>% 
        str_remove_all(pattern = "\\n|\\t") %>% 
        paste0("00:",.) %>% 
        mili_sec(index = 9) %>% 
        hms() %>% 
        period_to_seconds()  
      
      link_yt <- 
        loaded_page %>%
        html_nodes(xpath='//*[@class="volta-title"]/a/@href') %>% 
        html_text() %>% 
        str_remove_all(pattern = "\\n|\\t") %>% 
        clean_yt_link()
      
      volta_rapida <- bind_rows(volta_rapida, 
                                tibble(carro, tempo, link_yt))
      
      page <- page + 1
    }
   
  }
  
  return(volta_rapida)
}

### fim funcao de web-scraping

#dados (sem YT)
originais <- extract_volta_rapida()
preparados <- extract_volta_rapida(categoria = "preparados")
motos <- extract_volta_rapida(categoria = "motos")
suvs <- extract_volta_rapida(categoria = "5-suv")


## Usando o Rselenium para conseguir os dados do YT ---------------------------

library(RSelenium)  
#funcoes uteis para fazer webscraping do YT
source("YT_scraping_utils.R")

# Funcao para extrair os dados de uma lista de links
get_yt_data_acelerados <- function(lista_videos){
  
  #start RSelenium
  eCaps <- list(chromeOptions = list(
    args = c('--headless', '--disable-gpu', '--window-size=1280,800')
  ))
  rD <- rsDriver(extraCapabilities = eCaps)
  remDr <- rD[["client"]]
  #--------------------------------

#empty dataframe to fill with youtube data
  yt_data <- tibble()
  
  for (link_yt in lista_videos) {
    cat("\n")
    cat(link_yt)
    # navega pela pagina
    remDr$navigate(link_yt)
    #wait to the page load
    Sys.sleep(3)
    
    # codigo fonte da pagina
    page_source<-remDr$getPageSource()
    
    #read_html
    parsed_page <- 
      read_html(page_source[[1]])
    
    # data de publicacao
    data_publicacao <- get_yt_date(parsed_page)
    #tempo de duracao do video (em minutos)
    duracao_video_min <- get_yt_duration(parsed_page)
    #url da thumbnail
    url_thumbnail <-  get_yt_thumbnail(parsed_page)
    # quantidade de views
    views <- get_yt_views(parsed_page)
    # quantidade de likes e dislikes
    likes_dislikes <- get_yt_likes_dislikes(parsed_page)
    likes <- likes_dislikes$likes
    dislikes <- likes_dislikes$dislikes
    
    yt_data <- 
      bind_rows(yt_data,
                tibble(data_publicacao, duracao_video_min,
                       views, likes, dislikes, url_thumbnail))
  }

  # stop the selenium server
  #remDr$close()
  rD[["server"]]$stop()
  
  yt_data <- 
    yt_data %>% 
    mutate(data_captura = format(today(), "%d/%m/%Y"))
  
  return(yt_data)
}

# Using the function to get data
originais_yt <- get_yt_data_acelerados(originais$link_yt)
preparados_yt <- get_yt_data_acelerados(preparados$link_yt)
motos_yt <- get_yt_data_acelerados(motos$link_yt)
suvs_yt <- get_yt_data_acelerados(suvs$link_yt)

# Saving results to files!!! -------------------------------------------------
  
#problema no link do 39 dos originais
originais$link_yt[39] <- "https://www.youtube.com/watch?v=hxgpsszX84s"
data_yt_originais39 <- get_yt_data_acelerados(originais$link_yt[39])

# gambiarra
originais %>% 
  bind_cols(bind_rows(slice(originais_yt, 1:38),
                      data_yt_originais39,
                      slice(originais_yt, 39:238))) %>% 
  write.csv(file = "volta_rapida_originais.csv", row.names = F)

preparados %>% 
  bind_cols(preparados_yt) %>% 
  write.csv(file = "volta_rapida_preparados.csv", row.names = F)

motos %>% 
  bind_cols(motos_yt) %>%
  write.csv(file = "volta_rapida_motos.csv", row.names = F)

suvs %>% 
  bind_cols(suvs_yt) %>%
  write.csv(file = "volta_rapida_suvs.csv", row.names = F)
