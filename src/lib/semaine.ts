// Les commandes du week-end ferment le vendredi à 20 h 30, heure de Briansk (même fuseau que Moscou).
// Elles sont de nouveau ouvertes le lundi à 0 h. Entre-temps, la dernière minute reste possible pour ce week-end, selon disponibilité. À modifier ici ET dans `retrait.finCommandes` (data/infos.ts).
const LIMITE = 20 * 60 + 30;

export function commandesCloses(maintenant: Date = new Date()): boolean {
  const parties = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Moscow', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(maintenant);
  const lire = (type: Intl.DateTimeFormatPartTypes) => parties.find((p) => p.type === type)!.value;
  const jour = lire('weekday');
  if (jour === 'Sat' || jour === 'Sun') return true;
  return jour === 'Fri' && Number(lire('hour')) * 60 + Number(lire('minute')) >= LIMITE;
}

export function estDimanche(maintenant: Date = new Date()): boolean {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Moscow', weekday: 'short' }).format(maintenant) === 'Sun';
}
