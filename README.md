# lockdown_COVID19
This system is to predict lock down area due to COVID-19. The system includes two parts: first part is to using smartphone application by users to send their positions into the dedicated server, while the second part is to using the tracked users and then predict the crowded area to send notifications back to the users. The prediction result either the lock down area or none lock down area.

The prediction model is based on using k-mean clustering method! when the method is trying to cluster all the tracked users position information into a set of the clusters. Then based on emperical threshold the method will predict how the users are near to each other!
