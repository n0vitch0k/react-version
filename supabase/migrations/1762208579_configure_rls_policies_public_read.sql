-- Migration: configure_rls_policies_public_read
-- Created at: 1762208579

-- Activer RLS sur les tables
ALTER TABLE offres_emploi ENABLE ROW LEVEL SECURITY;
ALTER TABLE profils_candidats ENABLE ROW LEVEL SECURITY;

-- Politiques pour offres_emploi: lecture publique, modification service_role
CREATE POLICY "Public read access for offres_emploi"
ON offres_emploi FOR SELECT
USING (true);

CREATE POLICY "Service role full access for offres_emploi"
ON offres_emploi FOR ALL
USING (auth.role() IN ('service_role', 'authenticated'));

-- Politiques pour profils_candidats: lecture publique, modification service_role
CREATE POLICY "Public read access for profils_candidats"
ON profils_candidats FOR SELECT
USING (true);

CREATE POLICY "Service role full access for profils_candidats"
ON profils_candidats FOR ALL
USING (auth.role() IN ('service_role', 'authenticated'));;