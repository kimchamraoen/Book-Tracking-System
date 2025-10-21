<template>
  <div class="member-list">
    <table class="member-table">
      <thead>
        <tr>
          <th>Profile</th>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="8" style="text-align: center; padding: 20px; color: #666">
            Loading members...
          </td>
        </tr>
        <tr v-else-if="error">
          <td colspan="8" style="text-align: center; padding: 20px; color: #d32f2f">
            {{ error }}
            <button
              @click="membersStore.fetchMembers()"
              style="
                margin-left: 10px;
                padding: 5px 10px;
                border: 1px solid #d32f2f;
                background: white;
                color: #d32f2f;
                border-radius: 4px;
                cursor: pointer;
              "
            >
              Retry
            </button>
          </td>
        </tr>
        <tr
          v-else
          v-for="member in sortedMembers"
          :key="member.id"
          @click="goToMemberDetail(member)"
        >
          <td>
            <img :src="member.profileImage" alt="Member Profile" class="member-cover truncate" />
          </td>
          <td class="truncate">{{ member.id }}</td>
          <td class="truncate">{{ member.firstname }}</td>
          <td class="truncate">{{ member.lastname }}</td>
          <td class="truncate">{{ member.email }}</td>
          <td class="truncate">{{ member.phone }}</td>
          <td class="truncate">{{ member.department }}</td>
          <td class="truncate">{{ member.role }}</td>
          <td>
            <span :class="['status', statusClass(member.status)]">
              {{ member.status }}
            </span>
          </td>
        </tr>
        <tr v-if="!loading && !error && sortedMembers.length === 0">
          <td colspan="8" style="text-align: center; padding: 20px; color: #666">
            No members found
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { useMembersStore } from '../../../stores/members.js'

export default {
  name: 'MemberListContent',
  props: ['sortKey', 'sortOrder', 'filterValue'],
  data() {
    return {
      membersStore: useMembersStore(),
    }
  },
  async mounted() {
    // Fetch members when component mounts
    if (this.membersStore.members.length === 0) {
      await this.membersStore.fetchMembers()
    }
  },
  methods: {
    goToMemberDetail(member) {
      this.$router.push({ name: 'MemberDetails', params: { id: String(member.id) } })
    },
    statusClass(status) {
      const map = {
        Active: 'status-active',
        Suspended: 'status-suspended',
        Expired: 'status-expired',
        Pending: 'status-pending',
        Blocked: 'status-blocked',
      }
      return map[status] || 'status-unknown'
    },
  },
  computed: {
    members() {
      return this.membersStore.members
    },
    loading() {
      return this.membersStore.loading
    },
    error() {
      return this.membersStore.error
    },
    sortedMembers() {
      let result = [...this.members]

      // 1. Filter by value (e.g. only show "Computer Science" department)
      if (this.filterValue) {
        result = result.filter(
          (member) => String(member[this.sortKey]).toLowerCase() === this.filterValue.toLowerCase(),
        )
      }

      // 2. Sort alphabetically
      if (this.sortKey && this.sortKey !== 'none') {
        result.sort((a, b) => {
          const valA = String(a[this.sortKey] || '').toLowerCase()
          const valB = String(b[this.sortKey] || '').toLowerCase()
          if (this.sortOrder === 'asc') return valA.localeCompare(valB)
          if (this.sortOrder === 'desc') return valB.localeCompare(valA)
          return 0
        })
      }

      return result
    },
  },
}
</script>

<style scoped>
.member-list {
  /* padding: 20px; */
  overflow-x: auto;
}
.member-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 40px;
  border: 1px solid;
  font-size: 1rem;
}

.member-table th {
  background-color: #c8efff;
  border: 1px solid;
  white-space: nowrap;
  font-weight: 800;
  text-align: center;
  padding: 10px;
}

.member-table td {
  padding: 10px 16px;
  /* border-top: 1px solid #eee; */
  border: 1px solid;
  color: #555;
  vertical-align: middle;
}

.member-table tr {
  transition: background-color 0.2s;
  cursor: pointer;
}

.member-table tr:nth-child(even) {
  background-color: #f1f8ff;
}

.member-table tr:hover {
  background-color: #cee6ff;
}

/* Limit text overflow */
.truncate {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* member cover styling */
.member-cover {
  width: 50px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* Status color labels */
.status {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
}

.status-active {
  background-color: #e7f8ef;
  color: #1b7c2f;
}

.status-suspended {
  background-color: #fff6e0;
  color: #b97a00;
}

.status-expired {
  background-color: #fdeaea;
  color: #c62828;
}

.status-pending {
  background-color: #e0e9ff;
  color: #0044b9;
}

.status-blocked {
  background-color: #f3e5f5;
  color: #7b1fa2;
}

.status-unknown {
  background-color: #f5f5f5;
  color: #666;
}

/* Responsive: shrink font and spacing on smaller screens */
@media (max-width: 768px) {
  .member-table th,
  .member-table td {
    padding: 8px 10px;
    font-size: 14px;
  }

  .truncate {
    max-width: 120px;
  }

  .member-cover {
    width: 40px;
    height: 60px;
  }
}
</style>
