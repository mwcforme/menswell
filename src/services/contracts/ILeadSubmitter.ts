/**
 * Contract for submitting a captured lead to the downstream CRM.
 *
 * The current concrete implementation (`GhlProxyLeadSubmitter`) routes through
 * the `ghl-proxy` Supabase edge function and upserts a GoHighLevel contact.
 * Consumers MUST depend on this interface, never on the concrete impl, so the
 * transport can be swapped without touching UI code.
 */
export interface LeadInput {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  source?: string;
  tags?: string[];
}

export interface LeadResult {
  contactId: string;
}

export interface ILeadSubmitter {
  submitLead(input: LeadInput): Promise<LeadResult>;
}
