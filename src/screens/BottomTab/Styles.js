// styles.js
import { StyleSheet } from 'react-native';

// Renkler
const colors = {
  primary: '#3498db', // Ana renk (Mavi tonlarında)
  secondary: '#2ecc71', // İkinci renk (Yeşil)
  background: '#f7f7f7', // Arka plan rengi
  textPrimary: '#333', // Ana metin rengi
  textSecondary: '#7f8c8d', // İkinci metin rengi
  borderColor: '#e1e1e1', // Border rengi
};

export default StyleSheet.create({
  // Genel arka plan stili
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },

  // Başlık kısmı (Header) stili
  header: {
    height: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  // Tab bar stili
  tabBar: {
    backgroundColor: colors.primary,
    borderTopWidth: 0,
  },

  // Profile ekranı stil
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  profileButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ListGuide ve Mypatients sayfalarındaki stil
  listContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  listItem: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  listItemText: {
    fontSize: 18,
    color: colors.textPrimary,
  },

  // Bottom tab icon stilleri
  tabIcon: {
    paddingBottom: 5,
  },
});
