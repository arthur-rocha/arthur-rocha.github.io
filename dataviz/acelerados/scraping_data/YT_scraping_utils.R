### YT scraping Utils - PT-br

#requires
library(dplyr)
library(rvest)
library(httr)
library(xml2)
library(stringr)


# Funcoes de limpeza e parse dos dados do YT
clean_yt_duracao <- function(duracao_video){
  
  splited_duration <- 
    str_split(duracao_video, ":", simplify = T) %>% 
    as.numeric()
  
  minutes_d <- splited_duration[1]
  #transform seconds in minutes
  seconds_in_minutes <- round(splited_duration[2]/60, 2)
  
  return(minutes_d + seconds_in_minutes)
}

clean_yt_views <- function(n_views){
  n_views %>% 
    str_remove(" visualizações") %>% 
    str_remove_all("\\.") %>% 
    as.numeric()
}

clean_yt_likes <- function(n_likes, type){
  
  if (type == "like") {
    str_remove_all(n_likes, pattern = "\\.| gostaram") %>% 
      as.numeric()
  } else {
    str_remove_all(n_likes,
                   pattern = "\\.| marcações \"Não gostei\"") %>% 
      as.numeric()
  }
}

clean_yt_date <- function(yt_data){
  sub_meses <- function(mes){
    case_when(str_detect(mes, "jan") ~ "01",
              str_detect(mes, "fev") ~ "02",
              str_detect(mes, "mar") ~ "03",
              str_detect(mes, "abr") ~ "04",
              str_detect(mes, "mai") ~ "05",
              str_detect(mes, "jun") ~ "06",
              str_detect(mes, "jul") ~ "07",
              str_detect(mes, "ago") ~ "08",
              str_detect(mes, "set") ~ "09",
              str_detect(mes, "out") ~ "10",
              str_detect(mes, "nov") ~ "11",
              T ~ "12")
  }
  
  str_remove_all(yt_data, "de|\\.|em") %>% 
    str_replace_all(., "  ", "/") %>% 
    str_replace_all(., "[a-z]+", sub_meses(.)) %>% 
    str_remove_all(., paste0("E", c(paste0("0",1:9), 10:31), collapse = "|"))
}

#Funcoes de extracao de dados do YT a partir de uma pagina parseada (selenium)

#duracao do video em min
get_yt_duration <- function(yt_page){
  yt_page %>%   
    html_nodes(xpath = "//*[@class = 'ytp-time-duration']") %>%
    html_text() %>% 
    clean_yt_duracao()
}

#url da thumbnail
get_yt_thumbnail <- function(yt_page){
  yt_page %>% 
    html_nodes(xpath = '//*[@itemprop="thumbnailUrl"]/@href') %>%
    html_text()
}

# quantidade de views
get_yt_views <- function(yt_page){
  yt_page %>%   
    html_nodes(xpath = '//*[@class="view-count style-scope yt-view-count-renderer"]') %>%
    html_text() %>% 
    clean_yt_views()
}

# quantidade de likes e dislikes
get_yt_likes_dislikes <- function(yt_page){
  
  likes_dislikes <- 
    yt_page %>%   
    html_nodes(xpath = '//*[@class="style-scope ytd-toggle-button-renderer style-text"]/@aria-label') %>%
    html_text()
  
  likes <- clean_yt_likes(likes_dislikes[1], type = "like")
  dislikes <- clean_yt_likes(likes_dislikes[2], type = "dislike")
  
  return(tibble(likes, dislikes))
}

# data de publicacao do video
get_yt_date <- function(yt_page){
  yt_page %>%   
    html_nodes(xpath = '//div[@id="date"]/yt-formatted-string[@class="style-scope ytd-video-primary-info-renderer"]') %>%
    html_text() %>% 
    clean_yt_date()
}

