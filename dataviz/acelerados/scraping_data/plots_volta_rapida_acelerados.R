#### Graficos e analises

library(ggplot2)

## Grafico velocidade, originais:

originais %>% 
  mutate(y = rnorm(nrow(originais)),
         q1 = quantile(tempo, .015),
         q99 = quantile(tempo, .98),
         flag = if_else(tempo < q1 | tempo > q99, T, F),
         label = if_else(flag,
                         paste0(carro,"\n(",round(tempo,2),"s)"),
                         "")) %>% 
  ggplot(aes(tempo, jitter(y))) + 
  geom_jitter(aes(col = flag), show.legend = F, size = 2) +
  scale_color_manual(values = c("grey79", "firebrick3")) +
  ggrepel::geom_text_repel(aes(label = label), alpha = .8,
                           min.segment.length = .3, point.padding = .2,
                           size = 3) + 
  geom_vline(xintercept = quantile(originais$tempo, .1),
             col = 'grey36', alpha = .7) + 
  geom_vline(xintercept = quantile(originais$tempo, .9),
             col = 'grey36', alpha = .7) + 
  geom_vline(xintercept = quantile(originais$tempo, .5),
             col = 'grey21', alpha = .9) +
  theme_minimal() +
  theme(axis.title.y = element_blank(),
        axis.text.y = element_blank(),
        panel.grid.major = element_blank(),
        plot.title = element_text(face = 2, colour = "grey25" ),
        plot.subtitle = element_text(colour = "grey45" )) + 
  xlab("Tempo (s)") +
  ggtitle("Carros Originais", subtitle = "Ranking Volta Rápida em 08/12/19" ) +
  scale_x_continuous(breaks = quantile(originais$tempo, c(.1, .5, .9)) %>%
                       as.numeric() %>% 
                       round(digits = 2)) +
  annotate(
    geom = "curve", x = quantile(originais$tempo, .1),
    y = 6,
    xend = quantile(originais$tempo, .01) ,
    yend = 5.5, curvature = .3, arrow = arrow(length = unit(2, "mm")),
    alpha = .5) +
  annotate(
    geom = "curve", x = quantile(originais$tempo, .5),
    y = 6,
    xend = quantile(originais$tempo, .3) ,
    yend = 5.5, curvature = .3, arrow = arrow(length = unit(2, "mm")),
    alpha = .5) +
  annotate(
    geom = "curve", x = quantile(originais$tempo, .9),
    y = 6,
    xend = quantile(originais$tempo, .99) ,
    yend = 5.5, curvature = .3, arrow = arrow(length = unit(2, "mm")),
    alpha = .5) +
  annotate("label", x = quantile(originais$tempo, c(.1, .5, .9)),
           y = 6, label = c("10%", "50%", "90%"), alpha = .8,
           fill = "grey35", col = "white",
           size = 3) +
  annotate(geom = "text", x = quantile(originais$tempo, .07),
           y = 5.1, label = "10% dos veículos\nsuperaram essa marca",
           hjust = "right", size = 3, alpha = .8, col = "grey35") +
  annotate(geom = "text", x = quantile(originais$tempo, .47),
           y = 5.1, label = "50% dos veículos\nsuperaram essa marca",
           hjust = "right", size = 3, alpha = .8, col = "grey35") +
  annotate(geom = "text", x = quantile(originais$tempo, .991),
           y = 5.6, label = "90% dos veículos\nsuperaram essa marca",
           hjust = "left", size = 3, alpha = .8, col = "grey35")


## Grafico velocidade - preparados

preparados %>% 
  mutate(y = rnorm(nrow(preparados)),
         q1 = quantile(tempo, .05),
         q99 = quantile(tempo, .95),
         flag = if_else(tempo < q1 | tempo > q99, T, F),
         label = if_else(flag,
                         paste0(carro,"\n(",round(tempo,2),"s)"),
                         "")) %>% 
  ggplot(aes(tempo, jitter(y))) + 
  geom_jitter(aes(col = flag), show.legend = F, size = 2) +
  scale_color_manual(values = c("grey79", "firebrick3")) +
  ggrepel::geom_text_repel(aes(label = label), alpha = .8,
                           min.segment.length = .3, point.padding = .2,
                           size = 3) + 
  geom_vline(xintercept = quantile(preparados$tempo, .1),
             col = 'grey36', alpha = .7) + 
  geom_vline(xintercept = quantile(preparados$tempo, .9),
             col = 'grey36', alpha = .7) + 
  geom_vline(xintercept = quantile(preparados$tempo, .5),
             col = 'grey21', alpha = .9) +
  theme_minimal() +
  theme(axis.title.y = element_blank(),
        axis.text.y = element_blank(),
        panel.grid.major = element_blank(),
        plot.title = element_text(face = 2, colour = "grey25" ),
        plot.subtitle = element_text(colour = "grey45" )) + 
  xlab("Tempo (s)") +
  ggtitle("Carros preparados", subtitle = "Ranking Volta Rápida em 08/12/19" ) +
  scale_x_continuous(breaks = quantile(preparados$tempo, c(.1, .5, .9)) %>%
                       as.numeric() %>% 
                       round(digits = 2)) +
  annotate(
    geom = "curve", x = quantile(preparados$tempo, .1),
    y = 6,
    xend = quantile(preparados$tempo, .01) ,
    yend = 5.5, curvature = .3, arrow = arrow(length = unit(2, "mm")),
    alpha = .5) +
  annotate(
    geom = "curve", x = quantile(preparados$tempo, .5),
    y = 6,
    xend = quantile(preparados$tempo, .7) ,
    yend = 5.5, curvature = .3, arrow = arrow(length = unit(2, "mm")),
    alpha = .5) +
  annotate(
    geom = "curve", x = quantile(preparados$tempo, .9),
    y = 6,
    xend = quantile(preparados$tempo, .95) ,
    yend = 5.5, curvature = .3, arrow = arrow(length = unit(2, "mm")),
    alpha = .5) +
  annotate("label", x = quantile(preparados$tempo, c(.1, .5, .9)),
           y = 6, label = c("10%", "50%", "90%"), alpha = .8,
           fill = "grey35", col = "white",
           size = 3) +
  annotate(geom = "text", x = quantile(preparados$tempo, .07),
           y = 5.1, label = "10% dos veículos\nsuperaram essa marca",
           hjust = "right", size = 3, alpha = .8, col = "grey35") +
  annotate(geom = "text", x = quantile(preparados$tempo, .73),
           y = 5.2, label = "50% dos veículos\nsuperaram essa marca",
           hjust = "left", size = 3, alpha = .8, col = "grey35") +
  annotate(geom = "text", x = quantile(preparados$tempo, .953),
           y = 5.2, label = "90% dos veículos\nsuperaram essa marca",
           hjust = "left", size = 3, alpha = .8, col = "grey35")


## Grafico velocidade - Motos

motos %>% 
  mutate(y = rnorm(nrow(motos)),
         q1 = quantile(tempo, .1),
         q99 = quantile(tempo, .9),
         flag = if_else(tempo < q1 | tempo > q99, T, F),
         label = if_else(flag,
                         paste0(carro,"\n(",round(tempo,2),"s)"),
                         "")) %>% 
  ggplot(aes(tempo, jitter(y))) + 
  geom_jitter(aes(col = flag), show.legend = F, size = 2) +
  scale_color_manual(values = c("grey79", "firebrick3")) +
  ggrepel::geom_text_repel(aes(label = label), alpha = .8,
                           min.segment.length = .3, point.padding = .2,
                           size = 3) + 
  geom_vline(xintercept = quantile(motos$tempo, .1),
             col = 'grey36', alpha = .7) + 
  geom_vline(xintercept = quantile(motos$tempo, .9),
             col = 'grey36', alpha = .7) + 
  geom_vline(xintercept = quantile(motos$tempo, .5),
             col = 'grey21', alpha = .9) +
  theme_minimal() +
  theme(axis.title.y = element_blank(),
        axis.text.y = element_blank(),
        panel.grid.major = element_blank(),
        plot.title = element_text(face = 2, colour = "grey25" ),
        plot.subtitle = element_text(colour = "grey45" )) + 
  xlab("Tempo (s)") +
  ggtitle("Motos", subtitle = "Ranking Volta Rápida em 08/12/19" ) +
  scale_x_continuous(breaks = quantile(motos$tempo, c(.1, .5, .9)) %>%
                       as.numeric() %>% 
                       round(digits = 2), limits = c(50, 103)) +
  annotate(
    geom = "curve", x = quantile(motos$tempo, .1),
    y = 6,
    xend = quantile(motos$tempo, .01) ,
    yend = 5.5, curvature = .3, arrow = arrow(length = unit(2, "mm")),
    alpha = .5) +
  annotate(
    geom = "curve", x = quantile(motos$tempo, .5),
    y = 6,
    xend = quantile(motos$tempo, .7) ,
    yend = 5.5, curvature = .3, arrow = arrow(length = unit(2, "mm")),
    alpha = .5) +
  annotate(
    geom = "curve", x = quantile(motos$tempo, .9),
    y = 6,
    xend = quantile(motos$tempo, .95) ,
    yend = 5.5, curvature = .3, arrow = arrow(length = unit(2, "mm")),
    alpha = .5) +
  annotate("label", x = quantile(motos$tempo, c(.1, .5, .9)),
           y = 6, label = c("10%", "50%", "90%"), alpha = .8,
           fill = "grey35", col = "white",
           size = 3) +
  annotate(geom = "text", x = quantile(motos$tempo, .07),
           y = 5.1, label = "10% dos veículos\nsuperaram essa marca",
           hjust = "right", size = 3, alpha = .8, col = "grey35") +
  annotate(geom = "text", x = quantile(motos$tempo, .73),
           y = 5.2, label = "50% dos veículos\nsuperaram essa marca",
           hjust = "left", size = 3, alpha = .8, col = "grey35") +
  annotate(geom = "text", x = quantile(motos$tempo, .953),
           y = 5.2, label = "90% dos veículos\nsuperaram essa marca",
           hjust = "left", size = 3, alpha = .8, col = "grey35")


## Grafico velocidade - SUVS

suvs %>% 
  mutate(y = rnorm(nrow(suvs)),
         q1 = quantile(tempo, .1),
         q99 = quantile(tempo, .9),
         flag = if_else(tempo < q1 | tempo > q99, T, F),
         label = if_else(flag,
                         paste0(carro,"\n(",round(tempo,2),"s)"),
                         "")) %>% 
  ggplot(aes(tempo, jitter(y))) + 
  geom_jitter(aes(col = flag), show.legend = F, size = 2) +
  scale_color_manual(values = c("grey79", "firebrick3")) +
  ggrepel::geom_text_repel(aes(label = label), alpha = .8,
                           min.segment.length = .3, point.padding = .2,
                           size = 3) + 
  geom_vline(xintercept = quantile(suvs$tempo, .1),
             col = 'grey36', alpha = .7) + 
  geom_vline(xintercept = quantile(suvs$tempo, .9),
             col = 'grey36', alpha = .7) + 
  geom_vline(xintercept = quantile(suvs$tempo, .5),
             col = 'grey21', alpha = .9) +
  theme_minimal() +
  theme(axis.title.y = element_blank(),
        axis.text.y = element_blank(),
        panel.grid.major = element_blank(),
        plot.title = element_text(face = 2, colour = "grey25" ),
        plot.subtitle = element_text(colour = "grey45" )) + 
  xlab("Tempo (s)") +
  ggtitle("SUVs", subtitle = "Ranking Volta Rápida em 08/12/19" ) +
  scale_x_continuous(breaks = quantile(suvs$tempo, c(.1, .5, .9)) %>%
                       as.numeric() %>% 
                       round(digits = 2), limits = c(60,80)) +
  annotate(
    geom = "curve", x = quantile(suvs$tempo, .1),
    y = 6,
    xend = quantile(suvs$tempo, .01) ,
    yend = 5.5, curvature = .3, arrow = arrow(length = unit(2, "mm")),
    alpha = .5) +
  annotate(
    geom = "curve", x = quantile(suvs$tempo, .5),
    y = 6,
    xend = quantile(suvs$tempo, .7) ,
    yend = 5.5, curvature = .3, arrow = arrow(length = unit(2, "mm")),
    alpha = .5) +
  annotate(
    geom = "curve", x = quantile(suvs$tempo, .9),
    y = 6,
    xend = quantile(suvs$tempo, .95) ,
    yend = 5.5, curvature = .3, arrow = arrow(length = unit(2, "mm")),
    alpha = .5) +
  annotate("label", x = quantile(suvs$tempo, c(.1, .5, .9)),
           y = 6, label = c("10%", "50%", "90%"), alpha = .8,
           fill = "grey35", col = "white",
           size = 3) +
  annotate(geom = "text", x = quantile(suvs$tempo, .07),
           y = 5.1, label = "10% dos veículos\nsuperaram essa marca",
           hjust = "right", size = 3, alpha = .8, col = "grey35") +
  annotate(geom = "text", x = quantile(suvs$tempo, .73),
           y = 5.2, label = "50% dos veículos\nsuperaram essa marca",
           hjust = "left", size = 3, alpha = .8, col = "grey35") +
  annotate(geom = "text", x = quantile(suvs$tempo, .953),
           y = 5.2, label = "90% dos veículos\nsuperaram essa marca",
           hjust = "left", size = 3, alpha = .8, col = "grey35")


## Novos Plots (YT): -----------------------------------------------------------

originais_full <- read.csv("volta_rapida_originais.csv", stringsAsFactors = F)
preparados_full <- read.csv("volta_rapida_preparados.csv", stringsAsFactors = F)
motos_full <- read.csv("volta_rapida_motos.csv", stringsAsFactors = F)
suvs_full <- read.csv("volta_rapida_suvs.csv", stringsAsFactors = F)

volta_rapida_todos <- 
  bind_rows(originais_full,
            preparados_full,
            motos_full,
            suvs_full, 
            .id = "tipo"
            ) %>% 
  mutate(tipo = case_when(tipo == 1 ~ "Originais",
                          tipo == 2 ~ "Preparados",
                          tipo == 3 ~ "Motos",
                          T ~ "SUVs"))

#write.csv(volta_rapida_todos, "volta_rapida_todos.csv")
# Qual a quantidade de veículos na volta rápida até a data de hoje?

cat(paste("Total:", nrow(volta_rapida_todos)))

volta_rapida_todos %>% 
  mutate(data_publicacao = as.Date(data_publicacao, format = "%d/%m/%Y")) %>% 
  ggplot(aes(data_publicacao)) + 
  geom_point(stat = "count")

# Veículos mais velozes ganham mais likes ou views?

volta_rapida_todos %>% 
  ggplot(aes(likes, tempo)) + 
  geom_point()

volta_rapida_todos %>% 
  ggplot(aes(views, tempo)) + 
  geom_point()

cor(volta_rapida_todos$likes, volta_rapida_todos$tempo)

# Os últimos vídeos tiveram carros mais velozes? 

volta_rapida_todos %>% 
  mutate(data_publicacao = as.Date(data_publicacao, format = "%d/%m/%Y")) %>% 
  mutate(semestre = semester(data_publicacao, with_year = T)) %>% 
  filter(complete.cases(.)) %>% 
  ggplot(aes(factor(semestre), tempo)) + 
  geom_boxplot() + 
  geom_point()

volta_rapida_todos$data_publicacao
volta_rapida_todos$link_yt[147]

# Tempo x tipo_veiculo

volta_rapida_todos %>% 
  mutate(tipo = reorder(tipo, tempo)) %>% 
  ggplot(aes(tipo, tempo)) +
  geom_boxplot() + 
  geom_point()
