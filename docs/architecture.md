# Data and Interface architecture

## Linked records

| From | To | Relationship |
| --- | --- | --- |
| Coaches | Participants | One coach to many participants |
| Coaches | Coaching Plans | One coach to many plans |
| Coaches | Sessions | One coach to many sessions |
| Participants | Coaching Plans | One participant to an active plan |
| Participants | Sessions | One participant to many sessions |
| Coaching Plans | Sessions | One plan to its scheduled delivery |

Inverse linked fields are created by Airtable and retained in the provider schema.

## Interfaces

The Program Delivery Hub is an owner-facing overview. Three additional Interfaces are configured for coach-scoped work:

| Interface | Source | Editing |
| --- | --- | --- |
| My Participants | Participants | View record detail |
| My Coaching Plans | Coaching Plans | Status, next milestone, review date |
| My Sessions | Sessions | Outcome, next step, coach notes |

Each page uses `coach_user has any of Current user`.

## Deployment boundary

The Interface filters are configured, but user records and external invitations are deployment-specific. A production rollout must assign the intended Airtable users, test each identity separately and confirm the underlying base-sharing model.

The current implementation is not described as Airtable Portals, guest access or record-level database security.
